(function () {
    function parseUrl(url) {
        var link = document.createElement("a");
        link.href = url;
        return {
        	href: link.href,
            protocol: link.protocol,
            host: link.host,
            hostname: link.hostname,
            port: link.port,
            origin: link.origin,
            pathname: link.pathname,
            search: link.search,
            hash: link.hash
        };
    }

    function parseParam(str, name) {
        var parts = str.split("&"),
            part,
            key,
            result = name ? undefined : {};
        for (var i = 0, len = parts.length; i < len; i++) {
            part = parts[i];
            if (!part) {
                continue;
            }
            part = part.split("=");
            key = part.shift();
            if (name) {
                if (name === key) {
                    return part.join("=");
                }
            } else {
                result[key] = part.join("=");
            }
        }
        return result;
    }

    // 获取根域
    function getRootDomain() {
        var match = location.hostname.match(/\.[^\.]*\.(com|cn|net)$/);
        if (match) {
            return match[0].substring(1); // 不带点
        } else {
            return location.hostname;
        }
    }

    $.getRootDomain = getRootDomain;
    $.parseUrl = parseUrl;
    $.parseParam = parseParam;
})();