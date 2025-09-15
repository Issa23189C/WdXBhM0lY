// 代码生成时间: 2025-09-16 03:55:17
const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

// 文件备份和同步工具
class FileBackupSyncTool {
    // 构造函数，接收源目录和目标目录作为参数
    constructor(srcDir, destDir) {
        this.srcDir = srcDir;
        this.destDir = destDir;
    }

    // 备份文件：将源目录下的文件复制到目标目录
    backupFiles() {
        try {
            // 确保目标目录存在
            fs.ensureDirSync(this.destDir);

            // 遍历源目录下的所有文件和子目录
            fs.readdirSync(this.srcDir).forEach(file => {
                const srcPath = path.join(this.srcDir, file);
                const destPath = path.join(this.destDir, file);

                // 如果是文件，则直接复制
                if (fs.statSync(srcPath).isFile()) {
                    fs.copyFileSync(srcPath, destPath);

                    // 如果是目录，则递归复制
                } else if (fs.statSync(srcPath).isDirectory()) {
                    fs.copySync(srcPath, destPath);
                }
            });

            console.log('文件备份成功');

        } catch (error) {
            console.error('备份文件出错：', error.message);
        }
    }

    // 同步文件：比较源目录和目标目录的差异，并更新目标目录
    syncFiles() {
        try {
            // 确保目标目录存在
            fs.ensureDirSync(this.destDir);

            // 遍历源目录下的所有文件和子目录
            fs.readdirSync(this.srcDir).forEach(file => {
                const srcPath = path.join(this.srcDir, file);
                const destPath = path.join(this.destDir, file);

                // 如果源目录下的文件或目录不存在，则删除目标目录下的对应项
                if (!fs.existsSync(srcPath)) {
                    fs.removeSync(destPath);
                } else {
                    // 如果是文件，则比较文件内容是否相同，不同则更新
                    if (fs.statSync(srcPath).isFile()) {
                        if (fs.readFileSync(srcPath).toString() !== fs.readFileSync(destPath).toString()) {
                            fs.copyFileSync(srcPath, destPath);
                        }

                        // 如果是目录，则递归比较子目录和文件
                    } else if (fs.statSync(srcPath).isDirectory()) {
                        this.syncFilesRecursive(srcPath, destPath);
                    }
                }
            });

            console.log('文件同步成功');

        } catch (error) {
            console.error('同步文件出错：', error.message);
        }
    }

    // 递归同步子目录
    syncFilesRecursive(srcDir, destDir) {
        try {
            // 确保目标目录存在
            fs.ensureDirSync(destDir);

            // 遍历源目录下的所有文件和子目录
            fs.readdirSync(srcDir).forEach(file => {
                const srcPath = path.join(srcDir, file);
                const destPath = path.join(destDir, file);

                // 如果源目录下的文件或目录不存在，则删除目标目录下的对应项
                if (!fs.existsSync(srcPath)) {
                    fs.removeSync(destPath);
                } else {
                    // 如果是文件，则比较文件内容是否相同，不同则更新
                    if (fs.statSync(srcPath).isFile()) {
                        if (fs.readFileSync(srcPath).toString() !== fs.readFileSync(destPath).toString()) {
                            fs.copyFileSync(srcPath, destPath);
                        }

                        // 如果是目录，则递归比较子目录和文件
                    } else if (fs.statSync(srcPath).isDirectory()) {
                        this.syncFilesRecursive(srcPath, destPath);
                    }
                }
            });

        } catch (error) {
            console.error('递归同步文件出错：', error.message);
        }
    }
}

// 示例用法
const backupSyncTool = new FileBackupSyncTool('./src', './dest');
backupSyncTool.backupFiles();
backupSyncTool.syncFiles();