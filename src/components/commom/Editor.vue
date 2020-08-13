<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
        <button @click="getContent()">获取内容</button>        
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
      name: 'editor',
      data () {
        return {
          editorContent: this.$store.state.Description
        }
      },
      methods: {
        getContent: function () {
            alert(this.editorContent)
            this.$store.state.Description = this.editorContent
        }
      },
      mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
        editor.txt.html(this.$store.state.Description);
        
      }
    }
</script>

<style scoped>
.w-e-text {
    padding: 0 10px;
    overflow-y:hidden;
}
</style>
