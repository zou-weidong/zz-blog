# CRI 容器运行时接口
CRI 是一个插件接口，使 kubelet 能够使用各种容器运行时，无需重新编译集群组件。

CRI 是 kubelet 和容器运行时之间通信的主要协议。CRI 定义了 grpc 协议，用于集群组件 kubelet 与 容器运行时之间的通信。


当通过 grpc 连接到容器运行时，kubelet 充当客户端。运行时和镜像服务端点必须在容器运行时中可用。