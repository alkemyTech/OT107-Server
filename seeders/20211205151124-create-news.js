module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const news = [];
    // for (let index = 1; index < 38; index++) {
    //   const novelty = {
    //     name: `News ${index}`,
    //     content: `Content news ${index}`,
    //     image: 'https://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
    //     categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   };
    //   news.push(novelty);
    // }
    // await queryInterface.bulkInsert('News', news, {});
    await queryInterface.bulkInsert('News', [

      {
        name: 'Voluntariado',
        content: 'Especialista en Protección de Derechos de Niños, Niñas y Adolescentes en Situacion Migratoria ',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Voluntariado',
        content: 'Graphic Design for advocacy tools WHO Botswana',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Del dia',
        content: 'Estos son los mejores árboles en la lucha contra el calentamiento global y la contaminación',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Centro de donaciones',
        content: 'Brindamos alimentos nutritivos y elementos de higiene esenciales para chicas y chicos de 500 comunidades del país.',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Voluntariado',
        content: 'Markets for Change Project Officer',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Informe evaluación de procesos de la Iniciativa AYUD.AR',
        content: 'Cursos de reciclaje y reutilizacion en Escuelas Secundarias',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Huerta en casa',
        content: 'Actividades para aprender a Sembrar',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Energía comunitaria 1- Oligopolio energético 0',
        content: 'Escuelas y niños del presente enseñando a cultivar energía',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Los pueblos defienden su entorno, defiende la biodiversidad #OrgulloRural',
        content: 'El papel clave de la Argentina rural frente a la crisis climática y la pérdida de biodiversidad',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '¿Hay un problema de suministros en el sistema o hay un sistema que suministra problemas?',
        content: 'La verdadera solución es priorizar la eficiencia, la resiliencia y la sostenibilidad de la cadena de suministro.',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '¡Cumplimos 10 años!',
        content: '10 años después seguimos trabajando cada día para no perder lo que somos',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Voluntariado',
        content: 'Markets for Change Project Officer',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Voluntariado',
        content: 'Project Coordinator (TB)',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Voluntariado',
        content: 'Business & Human Rights Officer - Liberia',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Voluntariado',
        content: 'English to Hebrew Translation and Proofreading: Questionnaire for Wide Outreach in Middle East and North Africa',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Voluntariado',
        content: 'Social Media marketing/ outreach support',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Voluntariado',
        content: 'Design d’un bulletin trimestriel pour le programme des volontaires des Nations Unies au Burkina Faso',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Voluntariado',
        content: 'Desarrollar el proceso de personalización y configuración de plataforma Moodle Ministerio del Ambiente, Agua y Transición Ecológica del Ecuador',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Voluntariado',
        content: 'Security-Logistic Officer Yemen',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Voluntariado',
        content: 'Data Analyst - Brasil',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Voluntariado',
        content: 'Editar ilustración sobre el estuario del río Portoviejo para visibilizar servicios ecosistémicos',
        image: 'https://lamenteesmaravillosa.com/wp-content/uploads/2014/04/beneficios-voluntariado.jpg',
        categoryId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
  }
};
