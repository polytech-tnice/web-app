<template>
  <el-row :gutter="20">
    <el-col :span="10" :offset="7">
      <el-card v-if="!gameCreated" header="Création de partie">
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
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              :disabled="!socketConnected"
            >Créer</el-button>
            <el-button @click="resetForm('ruleForm')">Annuler</el-button>
          </el-form-item>
        </el-form>
        <el-alert
          v-if="!socketConnected"
          title="Impossible de se connecter au serveur"
          type="error"
          show-icon
          :closable="false"
        ></el-alert>
      </el-card>
      <el-card v-else :header="`Partie ${ruleForm.name}`">
        <div class="text item">Joueur 1 : {{ruleForm.name_p1}}</div>
        <div class="text item">Joueur 2 : {{ruleForm.name_p2}}</div>
        <br>
        <el-button
          v-if="gameCreated"
          @click="launchGame"
          :loading="gameInProgress"
        >{{gameInProgress ? "Partie en cours" : "Lancer la partie"}}</el-button>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      socketConnected: false,
      gameCreated: false,
      gameInProgress: false,
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
            trigger: "blur"
          }
        ]
      }
    };
  },
  sockets: {
    connect: function() {
      this.socketConnected = true;
      console.log("socket connected");
      this.$socket.emit("authentication", {
        name: "webApp"
      });
      this.$notify({
        title: "Succès",
        message: "Connecté au serveur",
        type: "success"
      });
    },
    fail: function(error) {
      console.log("Event error : ", error.code);
      const errorDesc = error && error.desc;
      this.$notify({
        title: "Erreur",
        message: errorDesc || "Erreur lors de la création de la partie",
        type: "error"
      });
    },
    success: function(msg) {
      console.log("Event success : ", msg.code);
      const msgDesc = msg && msg.desc;
      this.$notify({
        title: "Succès",
        message: msgDesc || "Partie correctement lancée",
        type: "success"
      });

      if (msg.code === 2) {
        this.gameCreated = true;
      }

      if (msg.code === 3) {
        this.gameInProgress = true;
      }
    },
    launchGame_success: function(msg) {
      console.log("Event success : ", msg.code);
      const msgDesc = msg && msg.desc;
      this.$notify({
        title: "Succès",
        message: msgDesc || "Partie correctement lancée",
        type: "success"
      });

      this.gameInProgress = true;
    },
    disconnect: function() {
      console.log("disconnect");
      this.$notify({
        title: "Information",
        message: "Déconnecté du serveur",
        type: "warning"
      });
      this.gameCreated = false;
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
          this.$socket.emit("initGame", initParams);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    launchGame() {
      this.$socket.emit("launchGame", {
        name: this.ruleForm.name
      });
    }
  }
};
</script>
