<template>
  <el-row :gutter="20">
    <el-col :span="10" :offset="7">
      <el-card header="Création de partie">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="180px"
          label-position="top"
          class="demo-ruleForm"
        >
          <el-form-item label="Nom de la partie" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Nom du joueur 1" prop="name_p1">
            <el-input v-model="ruleForm.name_p1"></el-input>
          </el-form-item>
          <el-form-item label="Nom du joueur 2" prop="name_p2">
            <el-input v-model="ruleForm.name_p2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Créer</el-button>
            <el-button @click="resetForm('ruleForm')">Annuler</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        name_p1: "",
        name_p2: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Veuillez préciser le nom de la partie",
            trigger: "blur"
          }
        ],
        name_p1: [
          {
            required: true,
            message: "Veuillez préciser le nom du joueur 1",
            trigger: "blur"
          }
        ],
        name_p2: [
          {
            required: true,
            message: "Veuillez préciser le nom du joueur 2",
            trigger: "change"
          }
        ]
      }
    };
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
      this.$socket.emit('authentification',  "webApp")
    },
    initGameReceived: function() {
      this.$notify({
        title: "Succès",
        message: "Partie correctement paramétrée",
        type: "success"
      });
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let initParams = {
            game_name: this.ruleForm.name,
            player1_name: this.ruleForm.name_p1,
            player2_name: this.ruleForm.name_p2
          };
          this.$socket.emit("initGame", JSON.stringify(initParams));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>