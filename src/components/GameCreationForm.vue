<template>
  <el-row :gutter="20">
    <el-col :span="8" :offset="8">
      <el-card header="Création de partie">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="180px"
          label-position="left"
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const initParams = {
            game_name: this.name,
            player1_name: this.name_p1,
            player2_name: this.name_p2
          };
          alert("submit!");
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