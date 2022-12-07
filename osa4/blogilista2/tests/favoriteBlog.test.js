const listHelper = require('../utils/list_helper')



describe('favorite blog', () => {
  const blogs = [
      {
        title: "Ruokajono",
        author: "Kalle Teräväinen",
        url: "ruokajono.fi",
        likes: 9,
        id: "6134f376dbb2c0d60082e6ea"
      },
      {
        title: "Minä ja muoti",
        author: "Outi Pekkanen",
        url: "muotiblogi.fi",
        likes: 13,
        id: "6134f492dbb2c0d60082e6eb"
      },
      {
        title: "Juorukello",
        author: "anonyymi",
        url: "juorukello.com",
        likes: 13,
        id: "6135077a6eecceadbf60cb91"
      },
      {
        title: "Aurinkomatkoilla",
        author: "Elisa Falla",
        url: "seikkalija.es",
        likes: 7,
        id: "61363d50807fc21b0ce43fd1"
      }      
    ]


    test('favorite blog', () => {
      const result = listHelper.favoriteBlog(blogs)

      const goal = 13;
      expect(result).toEqual(goal)
      
    })

    /*

    test('multiple favorite blogs', () => {
        const result = listHelper.favoriteBlog(blogs2)

        const goal = {
            title: "Minä ja muoti",
            author: "Outi Pekkanen",
            url: "muotiblogi.fi",
            likes: 13,
            id: "6134f492dbb2c0d60082e6eb"
          };
          expect(result).toEqual(goal)
          
    })*/

})