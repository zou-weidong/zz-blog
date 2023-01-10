# Kubelet 配置

## KubeletConfiguration
[KubeletConfiguration](https://kubernetes.io/zh-cn/docs/reference/config-api/kubelet-config.v1beta1/#kubelet-config-k8s-io-v1beta1-KubeletConfiguration) 中包含 Kubelet 的配置。

- apiVersion  kubelet.config.k8s.io/v1beta1
- kind  KubeletConfiguration
- allowedUnsafeSysctls  白名单列表
- authentication 发送给 kubelet 服务器的请求是如何验证身份的
- authorization 发送给 kubelet 服务器的请求是如何进行鉴权的
- cgroupDriver kubelet上用来控制宿主机上控制组的驱动程序，cgroupfs（默认） 或者 systemd
- cgroupsPerQOS 启用 Qos 的控制组层次结构
- clusterDNS 集群dns服务器ip地址的列表，默认为空。如果设置为所有的容器使用这里的ip地址，而不是宿主机上的dns服务器来完成dns解析(coredns的service ip地址)
- clusterDomain 集群的dns域名，默认为""（我们设置cluster.local ）
- containerLogMaxFiles 每个容器存在的日志文件个数上限，默认5
- containerLogMaxSize 容器日志文件可以达到最大的大小，默认10Mi
- 

