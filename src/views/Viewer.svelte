<script>
  let device = "iphone";
  let orientation = "portrait";
  let zoom = 75;
</script>

<style lang="scss">
  .viewer {
    width: 100%;
    height: 100%;
    background-color: $color_viewer_background;
    display: flex;
    flex-direction: column;

    .toolbar {
      width: 100%;
      min-height: 30px;
      background-color: $color_viewer_toolbar_background;
      color: $color_viewer_toolbar_text;
      display: flex;
      align-items: center;
      padding-left: 10px;
      .option {
        cursor: pointer;
        margin: 0 10px;
      }
    }

    .content {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      padding: 50px;
      overflow: auto;

      .scroll-container {
        margin: auto;
        max-height: 100%;
        overflow: auto;

        .preview {
          background-color: white;

          &.iphone {
            width: 372px;
            height: 812px;
            &.landscape {
              width: 812px;
              height: 372px;
            }
          }

          &.ipad {
            width: 768px;
            height: 1024px;
            &.landscape {
              width: 1024px;
              height: 768px;
            }
          }
        }
      }
    }
  }
</style>

<div class="viewer">
  <div class="toolbar">
    {#if device === 'ipad'}
      <div class="option" on:click={() => (device = 'iphone')}>
        <i class="fas fa-tablet-alt" />
      </div>
    {/if}

    {#if device === 'iphone'}
      <div class="option" on:click={() => (device = 'ipad')}>
        <i class="fas fa-mobile-alt" />
      </div>
    {/if}

    {#if orientation === 'landscape'}
      <div class="option" on:click={() => (orientation = 'portrait')}>
        <i class="fas fa-arrows-alt-h" />
      </div>
    {/if}

    {#if orientation === 'portrait'}
      <div class="option" on:click={() => (orientation = 'landscape')}>
        <i class="fas fa-arrows-alt-v" />
      </div>
    {/if}

    <input
      class="option"
      type="range"
      min="25"
      max="100"
      step="25"
      bind:value={zoom} />
    <span class="zoomLabel">{zoom} %</span>

  </div>
  <div class="content" style={'zoom:' + zoom + '%'}>
    <div class="scroll-container">
      <div class="preview {device + ' ' + orientation}" />
    </div>
  </div>
</div>
