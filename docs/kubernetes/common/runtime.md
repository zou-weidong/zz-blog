# 容器运行时

kubernetes 集群的每个node上安装一个**容器运行时**以便 Pod 可以运行在上面。

v1.24之前的 kubernetes 版本集成了 Docker Engine 的一个组件，名为 dockershim 。在v1.24之后会被移除，需要替换其他的运行时。


几种 kubernetes 常见的容器运行时：
- containerd
- CRI-O
- Docker Engine
- Mirantis Container Runtime


## cgroup 驱动
在 Linux 上， **CGroup** 用于限制分配给进程的资源。

kubelet 和运行时都需要对接控制组来强制执行为 Pod 和容器管理资源，如CPU和Memory。如果要对接控制组，kubelet和容器运行时需要使用一个cgroup驱动。并且 kubelet 和 容器运行时需要使用相同的 cgroup 驱动和相同的配置。


### 可用的 cgroup 驱动有两个：
- cgroupfs
- systemd


### cgroupfs 驱动
**cgroupfs** 驱动是 kubelet 中默认的cgroup驱动。当使用 cgroupfs 驱动时，kubelet 和容器运行时将直接对接 cgroup 文件系统来配置 cgroup。

当 **systemd** 是初始化系统时， 不推荐使用 cgroupfs 驱动，因为 systemd 期望系统上只有一个 cgroup 管理器。因此，如果使用 **cgroup v2**，则应该使用 systemd cgroup 驱动取代 cgroupfs。

### systemd cgroup 驱动
当某个 Linux 系统发行版使用 systemd 作为初始化系统时，初始化进程会生成并使用一个 root 控制组（cgroup），并充当 cgroup 管理器。


### 注意点
当机器上有两个不同的 cgroup 管理器时，会对资源出现两个视图。如将 kublet 和 容器运行时配置为 cgroupfs，但为剩余的进程使用 systemd 的那些节点会在资源压力增大时不稳定。



## containerd
[官方文档](https://github.com/containerd/containerd/blob/main/docs/getting-started.md) 

配置文件： **/etc/containerd/config.toml**

在 Linux 上，containerd 的默认 CRI 套接字是 **/run/containerd/containerd.sock**。



