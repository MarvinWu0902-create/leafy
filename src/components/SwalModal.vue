<script>
export default {
  props: {
    title: String,
    text: String,
    icon: String,
    confirmButtonText: String,
    cancelButtonText: String,
    showCancelButton: Boolean,
  },
  methods: {
    showAlert() {
      this.$swal.fire({
        title: this.title,
        text: this.text,
        icon: this.icon, /// success,error,warning,info,question
        confirmButtonText: this.confirmButtonText,
        showCancelButton: this.showCancelButton,
        cancelButtonText: this.cancelButtonText,
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.$emit('status', 'confirmed');
          } else if (result.isDismissed) {
            this.$emit('status', 'dismissed');
          }
        });
    },
  },
  mounted() {
    this.showAlert();
  },
};
</script>

<style lang="scss" scoped></style>
