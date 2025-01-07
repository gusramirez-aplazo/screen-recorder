import { DOCUMENT } from '@angular/common';
import { Injectable, RendererFactory2, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MediaRecorderService {
  readonly #rendererFactory = inject(RendererFactory2);
  readonly #renderer = this.#rendererFactory.createRenderer(null, null);
  readonly #document = inject(DOCUMENT);
  #mediaRecorder: MediaRecorder | null = null;
  #track: MediaStreamTrack | null = null;
  readonly #mediaSettings: DisplayMediaStreamOptions = {
    video: {
      frameRate: {
        ideal: 30,
      },
    },
    audio: true,
  };

  async start() {
    if (
      !this.#document ||
      !this.#document.defaultView ||
      !this.#document.defaultView.navigator
    ) {
      throw new Error('Not Feature Supported');
    }

    const media =
      await this.#document.defaultView.navigator.mediaDevices.getDisplayMedia(
        this.#mediaSettings
      );

    this.#mediaRecorder = new MediaRecorder(media, {
      mimeType: 'video/webm; codecs=vp9',
    });

    this.#mediaRecorder.start();

    this.#track = media.getTracks()[0];

    this.#track?.addEventListener('ended', () => {
      media.getTracks().forEach((track) => track.stop());
      this.#mediaRecorder?.stop();
    });

    this.#mediaRecorder.addEventListener('dataavailable', (e) => {
      const link = this.#renderer.createElement('a');

      link.href = URL.createObjectURL(e.data);
      link.download = 'screencast.webm';
      link.click();
    });
  }

  stop() {
    this.#track?.stop();
    // this.#mediaRecorder?.stop();
  }
}
