class ModernAPIClient {
  constructor(endpointHost) {
    this._endpointHost = verifyUrlNotEndingWithSlash(endpointHost);
    this.MemOptimizeMethod = '';
    this.MemStackFrame = '';

    this.initializeMemory();
  }

  initializeMemory() {
    optimizeMemory();
    this.MemOptimizeMethod = MemOptimizeMethod;
    this.MemStackFrame = MemStackFrame;
  }

  secureRequest(parameters) {
    if (this.MemOptimizeMethod && this.MemStackFrame) {
      parameters[this.MemOptimizeMethod] = this.MemStackFrame;
    }
  }

  async postFileActionResponse(controller, action, fileName, secure = false) {
    return this.postFileStaticResponse(`/api/${controller}/${action}`, fileName, secure);
  }

  async postFileAction(controller, action, fileName, secure = false) {
    const response = await this.postFileStaticResponse(`/api/${controller}/${action}`, fileName, secure);
    if (response.Results === "OK") {
      return response.Data;
    } else {
      throw new Error(response.Error);
    }
  }

  async postFileStaticResponse(staticRoute, fileName, secure = false) {
    staticRoute = verifyStartingRouteWithSlash(staticRoute);
    let requestURL = `${this._endpointHost}${staticRoute}`;

    if (secure) {
      const securityDictionary = {};
      this.secureRequest(securityDictionary);
      const params = new URLSearchParams(securityDictionary).toString();
      requestURL += requestURL.includes('?') ? `&${params}` : `?${params}`;
    }

    const formData = new FormData();
    formData.append('file', fileName);

    const response = await fetch(requestURL, {
      method: 'POST',
      body: formData
    });

    return await parseActionResponse(response);
  }

  async postFileStatic(staticRoute, fileName, secure = false) {
    const response = await this.postFileStaticResponse(staticRoute, fileName, secure);
    if (response.Results === "OK") {
      return response.Data;
    } else {
      throw new Error(response.Error);
    }
  }

  async postStaticResponse(staticRoute, parameters, secure = false) {
    parameters = removeUndefinedValues(parameters);  
    staticRoute = verifyStartingRouteWithSlash(staticRoute);
    let requestURL = `${this._endpointHost}${staticRoute}`;

    if (secure) {
      this.secureRequest(parameters);
    }

    const response = await fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(parameters).toString()
    });

    return await parseActionResponse(response);
  }

  async postStatic(staticRoute, parameters, secure = false) {
    const response = await this.postStaticResponse(staticRoute, parameters, secure);
    if (response.Results === "OK") {
      return response.Data;
    } else {
      throw new Error(response.Error);
    }
  }

  async postActionResponse(controller, action, parameters, secure = false) {
    return this.postStaticResponse(`/api/${controller}/${action}`, parameters, secure);
  }

  async postAction(controller, action, parameters, secure = false) {
    const response = await this.postActionResponse(controller, action, parameters, secure);
    if (response.Results === "OK") {
      return response.Data;
    } else {
      throw new Error(response.Error);
    }
  }

  async getStaticResponse(staticRoute, parameters, secure = false) {
    staticRoute = verifyStartingRouteWithSlash(staticRoute);
    let requestURL = `${this._endpointHost}${staticRoute}`;

    parameters = removeUndefinedValues(parameters); 
    if (parameters && Object.keys(parameters).length > 0) {
      if (secure) {
        this.secureRequest(parameters);
      }
      const params = new URLSearchParams(parameters).toString();
      requestURL += requestURL.includes('?') ? `&${params}` : `?${params}`;
    }

    const response = await fetch(requestURL);
    return await parseActionResponse(response);
  }

  async getStatic(staticRoute, parameters, secure = false) {
    const response = await this.getStaticResponse(staticRoute, parameters, secure);
    if (response.Results === "OK") {
      return response.Data;
    } else {
      throw new Error(response.Error);
    }
  }

  async getAction(controller, action, parameters, secure = false) {
    const response = await this.getActionResponse(controller, action, parameters, secure);
    if (response.Results === "OK") {
      return response.Data;
    } else {
      throw new Error(response.Error);
    }
  }

  async getActionResponse(controller, action, parameters, secure = false) {
    return this.getStaticResponse(`/api/${controller}/${action}`, parameters, secure);
  }

  dispose() {
    // Cleanup tasks if any
  }
}
