$(() => {
    let loaded = false

    $('#peopleButton').click(() => {
      if(!loaded) {
        $.ajax({
          type: 'GET',
          url: 'https://swapi.co/api/people/'
        }).done((res) => {
            $('#dataOne').text('Name')
            $('#dataTwo').text('Height')
            $('#dataThree').text('Birth Year')
          let people = res.results
          for(p of people) {
            $('#tableBody').append(createTableRow(p))
          }
          loaded = true
        })
      }
    })

    $('#shipButton').click(() => {
        if(!loaded) {
            loaded = true
          $.ajax({
            type: 'GET',
            url: 'https://swapi.co/api/starships/'
          }).done((res) => {
            $('#dataOne').text('Name')
            $('#dataTwo').text('Hyperdrive Rating')
            $('#dataThree').text('Starship Class')
            let ships = res.results
            for(s of ships) {
              $('#tableBody').append(createNewTableRow(s))
            }
            
          })
        }

      })
  
    function createTableRow(person){
        let row = $(`<tr></tr>`)
        let name = $(`<td>${person.name}</td>`)
        let height = $(`<td>${person.height}</td>`)
        let birth = $(`<td>${person.birth_year}</td>`)

        row.append(name)
        row.append(height)
        row.append(birth)

        return row
    }
    function createNewTableRow(ship){
        let row = $(`<tr></tr>`)
        let name = $(`<td>${ship.name}</td>`)
        let hyperdrive = $(`<td>${ship.hyperdrive_rating}</td>`)
        let sClass = (`<td>${ship.starship_class}</td>`)

        row.append(name)
        row.append(hyperdrive)
        row.append(sClass)

        return row
    }
    function tableHeader(){
       
    }
    $('#clearButton').click(() => {
        $('#tableBody').empty()
        $('#dataOne').text('Pick')
        $('#dataTwo').text('From')
        $('#dataThree').text('Above')
        loaded = false
    })

    $('#personSearchForm').submit((e) => {
        e.preventDefault()
        let input = $('#inputName').val()
        $.get(`https://swapi.co/api/people/?search=${input}`)
        .done((res) => {
        let person = res.results[0]
        $('#personInfoPanel').text(`${person.hair_color}`)
        })
    })
  })