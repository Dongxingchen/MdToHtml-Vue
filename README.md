# 1. 使用手册
>开发： 技术研究中心  
***
## 1.1. 功能
 - 将编辑好的markdown文件渲染成html，并生成带有目录的使用手册展示给用户
 - 一级目录以及二级目录内容由用户自己定义
 

## 1.2. 如何使用

 - 配置一级路由名：在App.vue中，分别是 home 、reference 、support（扩展模块，不用的话在app.vue中，将support对应的li删除即可）
 - 配置二级路由（目录）：在statics/json文件夹中，home和reference的目录分别在home.json和reference.json中配置，其中homeName[]中编辑分组名，homeNav[]下编辑该homeName对应目录
 - 特别说明二级目录一组数据代表一个分组
 - markdown文件统一放在了statics/md文件夹中
 - markdown文件命名规范：
	 - 一级路由home下的二级路由（目录）根据不同分组命名,例如home下的第一组home10、home11...，home下的第二组home20、home21...以此类推
	 - 一级路由reference下的二级路由（目录）根据不同分组命名,例如reference下的第一组reference10、reference11...，reference下的第二组reference20、reference21...以此类推
			
			如下所示：

			├── dist/
			│    ├──  bundle.js
			│    └──  index.html
			│
			├── statics/
			│       ├── json/
			│       │        ├── home.json
			│ 		│        └── reference.json
			│       │
			│   	└── md/
			│          ├── home10.md
			│          ├── home11.md
			│          ├── home12.md
			│		   │		...│
			│          ├── home20.md
			│		   ├── home21.md
			│		   ├──     ...
			│		   ├── reference10.md
			│		   └──     ...
			│				
			└── 
			   

