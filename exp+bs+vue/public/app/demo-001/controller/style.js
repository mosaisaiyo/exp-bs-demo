var app = new Vue({
    el: '#app',
    data: {
        colType1: 'active',
        colType2: 'success',
        colType3: 'warning',
        freeText: 'Hello world',
        list: ["one", "two", "three","four","five","six","seven","eight"],
        colorIdx: 0,
        colorList: ["active", "success", "warning", "danger", "info"],
        selected: 'A',
        options: [
            { text: 'One', value: 'A' },
            { text: 'Two', value: 'B' },
            { text: 'Three', value: 'C' },
            { text: 'four', valule: 'D'}
        ]
    },
    methods: {
        changeColor: function (evt) {
            //alert('Hello ' + this.colType + '!')
            if (this.colorIdx < (this.colorList.length - 1)) {
                this.colorIdx++;
            } else {
                this.colorIdx = 0;
            }
            this.colType = this.colorList[this.colorIdx];
            
            if (this.freeText === 'Hello world') {
                this.freeText = 'Haha...';
            } else {
                this.freeText = 'Hello world';
            }
        }
    }
});

Vue.component('button-counter', {
    data: function () {
      return {
        count: 0
      }
    },
    template: '<button class="btn btn-success" v-on:click="count++">You clicked me {{ count }} times.</button>'
  });

var comp = new Vue({ el: '#components-demo' });