module.exports = {
    apps: [
      {
        name: "quiz-online",       // Название вашего приложения
        script: "./dist/main.js",  // Путь к скомпилированному файлу main.js
        instances: 1,              // Количество инстансов
        exec_mode: "fork",         // Режим выполнения (fork или cluster)
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  