<template>
  <div>
    <md-empty-state
      md-icon="devices_other"
      md-label="初始化您的 PokaPlayer"
      md-description="完成初始化後，您便能在此享受音樂！"
      v-if="step==0"
    >
      <md-button class="md-primary md-raised" @click="step=1">初始化</md-button>
    </md-empty-state>
    <md-steppers :md-active-step.sync="active" md-vertical v-if="step==1">
      <md-step id="first" md-label="PokaPlayer" :md-done.sync="first">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <md-button class="md-raised md-primary" @click="setDone('first', 'second')">下一步</md-button>
      </md-step>

      <md-step id="second" md-label="模組" :md-error="secondStepError" :md-done.sync="second">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <md-button class="md-raised md-primary" @click="setDone('second', 'third')">下一步</md-button>
        <md-button @click="setError()">Set error!</md-button>
      </md-step>

      <md-step id="third" md-label="確認資料" :md-done.sync="third">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloribus eveniet quaerat modi cumque quos sed, temporibus nemo eius amet aliquid, illo minus blanditiis tempore, dolores voluptas dolore placeat nulla.</p>
        <md-button class="md-raised md-primary" @click="setDone('third');checkRestart()">完成</md-button>
      </md-step>
    </md-steppers>
    <md-empty-state
      md-rounded
      md-icon="done"
      md-label="完成！"
      md-description="正在等待伺服器重啟"
      v-if="step==2"
    >
      <md-progress-spinner :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
    </md-empty-state>
    <md-empty-state
      md-rounded
      md-icon="done"
      md-label="完成！"
      md-description="伺服器重啟完成，請點擊下面按鈕重新載入頁面"
      v-if="step==3"
    >
      <md-button class="md-primary md-raised" to="/">完成</md-button>
    </md-empty-state>
  </div>
</template>

<script>
export default {
  name: "Install",
  data: () => ({
    active: "first",
    first: false,
    second: false,
    third: false,
    secondStepError: null,
    step: 0
  }),
  methods: {
    setDone(id, index) {
      this[id] = true;

      this.secondStepError = null;

      if (index) {
        this.active = index;
      }
    },
    setError() {
      this.secondStepError = "發生錯誤";
    },
    async checkRestart() {
      this.step = 2;
      setTimeout(() => {
        this.step = 3;
      }, 2000);
    }
  }
};
</script>