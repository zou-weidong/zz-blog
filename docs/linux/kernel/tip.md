# Command

## modprobe
显示内核中的模块、查看模块的配置文件、加载模块以及卸载模块。


**modprobe**可载入指定的个别模块，或者载入一组相依的模块。若在载入过程中发生错误，在 **modprobe** 会卸载整组的模块。

> modprobe [-acdlrtvV][--help][模块文件][符号名称 = 符号值]

参数：
- -a 或 --all 载入全部模块
- -c 显示所有模块的设置信息
- -d 使用debug模式
- -l 显示可用的模块
- -r 模块闲置不用时，自动卸载模块
- -t 指定模块类型
- -v 执行时显示详细的信息
- -V 版本信息

例如：
```
# 安装软驱模块
modprobe -v floppy
# 卸载软驱模块
```














https://deepinout.com/linux-cmd/linux-module-kernel-related-cmd/linux-cmd-modprobe.html