// 代码生成时间: 2025-09-13 10:29:50
const next = require('next');
const fetch = require('node-fetch');

// 创建Next.js应用
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// 验证链接是否有效
async function validateUrl(url) {
    try {
        const response = await fetch(url);
        // 如果状态码在200-299之间，则认为链接有效
        if (response.ok) {
            return { valid: true };
        } else {
            return { valid: false, status: response.status };
        }
    } catch (error) {
        // 捕获并处理错误，如网络错误等
        return { valid: false, error: error.message };
    }
}

// 设置路由
app.prepare().then(() => {
    require('http').createServer((req, res) => {
        handle(req, res, parsedUrl) => {
            if (parsedUrl.pathname === '/validate-url') {
                // 解析查询参数
                const urlToValidate = req.query.url;
                if (!urlToValidate) {
                    // 如果没有提供URL参数，返回错误
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: 'URL parameter is required' }));
                    return;
                }
                // 验证URL
                validateUrl(urlToValidate)
                    .then(result => {
                        res.statusCode = result.valid ? 200 : 503;
                        res.end(JSON.stringify(result));
                    }).catch(error => {
                        // 处理验证过程中的错误
                        res.statusCode = 500;
                        res.end(JSON.stringify({ error: 'Error validating URL', details: error.message }));
                    });
            } else {
                // 其他路由将被Next.js处理
                handle(req, res);
            }
        });
    }).listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});