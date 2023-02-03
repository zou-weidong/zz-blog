# Kubelet

## 通过配置文件设置 kubelet 参数
建议通过配置文件的方式提供参数，这样可以简化节点部署和配置管理。

### 创建配置文件

**KubeletConfiguration** 结构体定义了通过文件配置的 kubelet 配置子集，配置文件必须是 json 或者 yaml 的形式，如：

```
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
address: "192.168.0.8"
port: 20250
serializeImagePulls: false
evictionHard:
    memory.available:  "200Mi"
```