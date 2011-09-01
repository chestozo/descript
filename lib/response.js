// ----------------------------------------------------------------------------------------------------------------- //
// Response
// ----------------------------------------------------------------------------------------------------------------- //

var Response = function(response) {
    this._response = response;

    this.headers = {};
    this.cookies = {};
};

Response.prototype.setHeader = function(name, value) {
    this.headers[name] = value;
};

Response.prototype.setCookie = function(name, value) {
    this.cookies[name] = value;
};

Response.prototype.setStatus = function(status) {
    this.status = status;
};

Response.prototype.setRedirect = function(location) {
    this.location = location;
};

Response.prototype.end = function(data) {
    var response = this._response;

    var headers = this.headers;
    for (var header in headers) {
        response.setHeader(header, headers[header]);
    }

    var cookies = this.cookies;
    var cookie = [];
    for (var name in cookies) {
        cookie.push(name + '=' + cookies[name]);
    }
    response.setHeader('Set-Cookie', cookie); // FIXME: Выставлять expire и т.д.

    if (this.location) {
        response.statusCode = 302;
        response.setHeader('Location', this.location);
        response.end();
        return;
    }

    response.statusCode = this.status || 200;
    response.end(data);
};

// ----------------------------------------------------------------------------------------------------------------- //

module.exports = Response;

// ----------------------------------------------------------------------------------------------------------------- //
