import { Injectable, inject } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private toastService = inject(HotToastService);

  constructor() {}

  toastSuccess(message: string) {
    this.toastService.success(message, {
      duration: 5000,
      autoClose: true,
      dismissible: true,
      style: {
        marginTop: "45px",
        color: "#ffffff",
        background: "#42d77d",
      },
      iconTheme: {
        primary: "#28ba62",
      },
    });
  }
  toastMessageHigh(message: string) {
    this.toastService.warning(message, {
      position: "bottom-center",
      duration: 10000,
      autoClose: true,
      dismissible: true,

      style: {
        marginTop: "45px",
        fontSize: "17px",
        color: "#ffffff",
        background: "#ff0000",
        width: "400px",
      },
      iconTheme: {
        primary: "#e0ac08",
      },
    });
  }

  toastMessageMedium(message: string) {
    this.toastService.warning(message, {
      position: "bottom-center",
      duration: 10000,
      dismissible: true,
      autoClose: true,

      style: {
        marginTop: "45px",
        fontSize: "17px",
        color: "#030303",
        background: "#fba200",
        width: "400px",
      },
      iconTheme: {
        primary: "#e0ac08",
      },
    });
  }

  toastMessageLow(message: string) {
    this.toastService.warning(message, {
      position: "bottom-center",
      duration: 10000,
      dismissible: true,
      autoClose: true,

      style: {
        marginTop: "45px",
        fontSize: "17px",
        color: "#030303",
        background: "#ffff00",
        width: "400px",
      },
      iconTheme: {
        primary: "#e0ac08",
      },
    });
  }

  toastMessageEmpty(message: string) {
    this.toastService.warning(message, {
      position: "bottom-center",
      duration: 10000,
      dismissible: true,
      autoClose: true,

      style: {
        marginTop: "45px",
        fontSize: "17px",
        color: "#030303",
        background: "#D8D9DA",
        width: "400px",
      },
      iconTheme: {
        primary: "#3b3e40",
      },
    });
  }

  toastMessageTolerable(message: string) {
    this.toastService.warning(message, {
      position: "bottom-center",
      duration: 10000,
      dismissible: true,
      autoClose: true,

      style: {
        marginTop: "45px",
        fontSize: "17px",
        color: "#030303",
        background: "#57b031",
        width: "400px",
      },
      iconTheme: {
        primary: "#e0ac08",
      },
    });
  }

  toastWarning(message: string) {
    this.toastService.warning(message, {
      duration: 5000,
      autoClose: true,
      dismissible: true,
      style: {
        marginTop: "45px",
        color: "#ffffff",
        background: "#ffca22",
      },
      iconTheme: {
        primary: "#e0ac08",
      },
    });
  }

  toastFailed(message: string) {
    this.toastService.error(message, {
      duration: 5000,
      autoClose: true,
      style: {
        marginTop: "45px",
        color: "#ffffff",
        background: "#ed576b",
      },
      iconTheme: {
        primary: "#cf3c4f",
      },
    });
  }
}
