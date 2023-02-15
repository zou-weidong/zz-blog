# Flatcar Container Linux

**Flatcar** 是一种容器优化的操作系统，提供了一个最小的操作系统镜像，其中仅包含运行容器所需要的工具。操作系统通过不可变的文件系统交付，并包括自动院子更新。


## 安装
支持大多数的云供应商、虚拟化平台和裸机服务器上运行。这里主要介绍几种不同的方式在裸机安装：
- 从 ISO 镜像安装
- 使用 PXE 引导
- 使用 iPXE 启动
- 使用 flatcar-install 安装


### iPXE

**iPXE** 是一个开源网络启动固件。提供了一个完整的 PXE 实施，增强了其他功能，例如：
- 通过 HTTP 从 web 服务器启动
- 从无线网络启动
- 从广域网启动
- 从 Infiniband 网络启动
- 使用脚本控制启动过程
- ...

iPXE 同时支持 UEFI 和 BIOS 平台。


### PXE
**PXE** 是 **Perboot eXecution Environment** 的缩写，意为“预启动执行环境”，这种机制可以使计算机通过网络来引导。现在的绝大多数电脑都可以设置通过 PXE 启动。
PXE 的工作原理是 PXE Client 通过 DHCP 获取 IP，并由 DHCP 服务器告诉客户端启动文件的位置，再通过 TFTP 协议传输引导文件，最终引导电脑启动。

