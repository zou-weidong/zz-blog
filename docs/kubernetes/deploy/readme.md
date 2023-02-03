# 搭建K8S集群
可以搭建单master集群，管理多个node节点。也可以使用多个master节点，管理多个node节点，同时对多个apiserver使用负载均衡。

## 服务器配置
一般测试环境搭建：
- master：2核 4G
- node：  4核 8G 硬盘30G

生产环境：
- master：8核  16G 
- node： 8/16核 32G/64G 

## 搭建方式
- kubeadm是一个k8s部署工具，提供 kubeadm init 和 kubeadm join，用于快速部署 kubernetes 集群。
- 二进制包方式，下载发行版包，手动部署每个组件，组成 Kubernetes 集群。


## kubeadm 部署集群
kubeadm工具能够通过两条指令完成一个 kubernetes 集群的部署。
- 创建一个master节点 **kubeadm init**
- 将 Node 节点加入到当前集群中 **kubeadm join**

https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/install-kubeadm/

### 安装要求
- 操作系统 Centos7.x
- 集群中的机器互通
- 可以访问外网，需要拉取镜像
- 禁止 swap 分区


### 环境准备

master: 192.168.177.130
node1: 192.168.177.131
node2: 192.168.177.132

在每台机器上执行以下命令：
```
# 关闭防火墙
systemctl stop firewalld
systemctl disable firewalld


# 关闭 selinux
# 永久关闭
sed -i 's/enforcing/disabled/' /etc/selinux/config
# 临时关闭
setenforce 0


# 关闭 swap
# 永久关闭
sed -ri 's/.*swap.*/#&/' /etc/fstab
# 临时关闭
swapoff -a

# 规划主机名（各个机器不同执行）
hostnamectl set-hostname k8smaster/k8snode1/k8snode2

# 添加hosts
cat >> /etc/hosts << EOF
192.168.177.130 k8smaster
192.168.177.131 k8snode1
192.168.177.132 k8snode2
EOF

# 将桥接的 Ipv4 流量传递到 iptables 的链
cat > /etc/sysctl.d/k8s.conf << EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
# 生效
sysctl --system  


# 时间同步
yum install ntpdata -y
ntpodata time.windows.com

```

### 所有节点安装 Docker/kubeadm/kubelet

**配置docker源**

https://developer.aliyun.com/mirror/?spm=a2c6h.13651104.0.d1002.2cd533174OAYBv

```
# 使用阿里源
cat >/etc/yum.repos.d/docker.repo<<EOF
[docker-ce-edge]
name=Docker CE Edge - \$basearch
baseurl=https://mirrors.aliyun.com/docker-ce/linux/centos/7/\$basearch/edge
enabled=1
gpgcheck=1
gpgkey=https://mirrors.aliyun.com/docker-ce/linux/centos/gpg
EOF

```

**安装docker**

```
# yum安装
yum -y install docker-ce

# 查看docker版本
docker --version  

# 启动docker
systemctl enable docker
systemctl start docker

# 配置docker的镜像源
cat >> /etc/docker/daemon.json << EOF
{
  "registry-mirrors": ["https://b9pmyelo.mirror.aliyuncs.com"]
}
EOF

#重启docker
systemctl restart docker

```

**配置k8s源**

```
cat > /etc/yum.repos.d/kubernetes.repo << EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

**安装 kubeadm kubelet kubectl**

```
# 安装kubelet、kubeadm、kubectl，同时指定版本
yum install -y kubelet-1.18.0 kubeadm-1.18.0 kubectl-1.18.0
# 设置开机启动
systemctl enable kubelet
```

### 部署 kubernetes master node
```
kubeadm init --apiserver-advertise-address=192.168.177.130 --image-repository registry.aliyuncs.com/google_containers --kubernetes-version v1.18.0 --service-cidr=10.96.0.0/12  --pod-network-cidr=10.244.0.0/16
```

当出现 **successfully** 字样时表示已经安装成功。最下面有工作节点添加进集群的命令，需要copy。

```
#使用 kubectl 工具
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# 检查，会发现有一个master节点，但是状态是 NotReady
kubectl get nodes

```

### 部署 kubernetes worker node
复制 **kubeadm init ...** 输出的 **kubeadm join** 命令执行。默认 token 的有效期是 24h，当过期之后需要重新创建token。

```
kubeadm token create --print-join-command
```

当我们把两个节点都加入进来后，可以去 master 节点执行下面命令：
```
# 出现三个节点，但是状态都是 NotReady
kubectl get node
```
### 部署 CNI 网络插件

```
# 下载网络插件配置，需要修改镜像
wget https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml

# apply 一下创建，之后会发现已经 Ready

# 如果还是有些节点处于 NotReady 状态，可以在master节点删除该节点，然后节点重置之后重新加入。
kubectl delete node k8snode1
#在 k8snode1 节点上进行重置
kubeadm reset 
# 重置完成后加入
kubeadm join 192.168.177.130:6443 --token 8j6ui9.gyr4i156u30y80xf     --discovery-token-ca-cert-hash sha256:eda1380256a62d8733f4bddf926f148e57cf9d1a3a58fb45dd6e80768af5a500

```

## 二进制搭建
