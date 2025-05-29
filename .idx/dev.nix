{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.git
  ];
  env = {
    NODE_ENV = "development";
    FIREBASE_STUDIO = "studio";
  };

  idx = {
    extensions = [
      "svelte.svelte-vscode"
      "vue.volar"
      "dbaeumer.vscode-eslint"
      "esbenp.prettier-vscode"
      "dsznajder.es7-react-js-snippets"
      "ms-vscode.vscode-typescript-next"
    ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = [
            "npm"
            "run"
            "dev"
            "--"
            "--port"
            "$PORT"
            "--host"
            "0.0.0.0"
          ];
          manager = "web";
        };
      };
    };
    workspace = {
      onCreate = {
        setup = "npm install";
        default.openFiles = [ "README.md" "src/App.tsx" "package.json" ];
      };
      onStart = {
        run-server = "./devserver.sh";
      };
    };
  };
}