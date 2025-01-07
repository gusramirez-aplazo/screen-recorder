import { Component, inject } from '@angular/core';
import { MediaRecorderService } from './media-recorder.service';

@Component({
  standalone: true,
  selector: 'app-screener',
  template: `
    <main
      class="text-white max-w-sm mx-auto h-svh flex flex-col items-center gap-4 pt-14"
    >
      <h1 class="text-lg font-bold text-center">Screener</h1>

      <article
        class="shadow-inner shadow-white rounded p-8 flex items-center justify-center flex-wrap gap-4"
      >
        <button
          type="button"
          class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          (click)="start()"
        >
          Start recording
        </button>
        <button
          type="button"
          class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          (click)="stop()"
        >
          Stop
        </button>
      </article>
    </main>
  `,
})
export class ScreenerComponent {
  readonly #recorder = inject(MediaRecorderService);

  start() {
    this.#recorder.start();
  }

  stop() {
    this.#recorder.stop();
  }
}
