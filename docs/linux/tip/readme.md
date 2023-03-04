# Linux 1. 服务器配置 SSH 公钥登陆

1. Xshell 工具可以生成公私钥对，输入密码加密。
2. 在服务器端编辑 **/etc/ssh/sshd_conf** 。
    ```
    RSAAuthentication yes #开启RSA认证
    PubkeyAuthentication yes #开启公钥认证
    AuthorizedKeysFile .ssh/authorized_keys #设置公钥的保存位置，默认为用户目录下的.ssh目录，没有可自行创建。
    ```
3. 将保存好的 **.pub 公钥文件** 上传到服务器，保存在 **~/.ssh/authorized_keys** 文件中。
4. 设置权限
    ```
    chmod 700 .ssh
    chmod 600 ~/.ssh/authorized_keys
    ```
5. 重启 sshd 服务以使配置生效
    ```
    service sshd restart
    ```
6. 在测试公钥登陆成功后可以再次编辑 **/etc/ssh/sshd_config** 文件，关闭密码登陆，提高安全性。
    ```
    PasswordAuthentication no
    ```

# 2. tcpdump 抓包
tcpdump 是一个网络数据包截获分析工具。支持针对网络层、协议、主机、网络或者端口的过滤。并提供and or not 等逻辑语句。

```
tcpdump tcp -i eth1 -t -s 0 -c 100 and dst port ! 22 and src net 192.168.1.0/24 -w ./tag.cap
```

解释如下：
- tcp ：过滤数据包的类型，放到第一个参数位置， icmp arp tcp udp 等
- -i eth1 ：只抓经过接口 eth1 的包
- -t ：不显示时间戳
- -s 0 ：抓完整的数据包，因为抓取数据包时默认的长度为68字节
- -c 100 ：只抓取 100 个数据包
- dst port ! 22 ： 不抓取目标端口是22的数据包
- src net 192.168.1.0/24 ： 数据包的源网络地址是 192.168.1.0
- -w ./tag.cap 保存成 cap 文件，方便 wireshark 分析


