export function toQuery(params, delimiter = "&") {
  const keys = Object.keys(params);

  return keys.reduce((str, key, index) => {
    let query = `${str}${key}=${params[key]}`;

    if (index < keys.length - 1) {
      query += delimiter;
    }

    return query;
  }, "");
}

function toParams(query) {
  const q = query.replace(/^\??\//, "");

  return q.split("&").reduce((values, param) => {
    const [key, value] = param.split("=");

    values[key] = value;

    return values;
  }, {});
}

class PopupWindow {
  constructor(id, url, options = {}) {
    this.id = id;
    this.url = url;
    this.options = options;
  }

  open() {
    const { url, id, options } = this;

    this.window = window.open("about:blank", id, toQuery(options, ","));
    if (this.window) {
      this.window.location.href = url;
    }
  }

  close() {
    this.cancel();
    this.window?.close();
  }

  poll() {
    this.promise = new Promise((resolve, reject) => {
      this.interval = window.setInterval(() => {
        try {
          const popup = this.window;

          if (!popup || popup.closed !== false) {
            this.close();

            reject(new Error("The popup was closed"));

            return;
          }

          if (popup.location.pathname === "blank") {
            return;
          }

          const params = toParams(popup.location.hash.replace(/^#/, ""));
          resolve(params);

          this.close();
        } catch (error) {
          /*
           * Ignore DOMException: Blocked a frame with origin from accessing a
           * cross-origin frame.
           */
        }
      }, 1000);
    });
  }

  cancel() {
    if (this.interval) {
      window.clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  static open(id, url, options = {}) {
    const popup = new this(id, url, options);

    popup.open();
    popup.poll();

    return popup.promise;
  }
}

export default PopupWindow;
