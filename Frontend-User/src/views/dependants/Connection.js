function search(query, cb) {
    return new Promise( (resolve,reject) => {
      return fetch(`api/${query}`, {
        accept: "application/json"
      })
        .then(parseJSON)
        .then(data => resolve(data));
    })
  
  }
  
  function create(type, data){
     
    return new Promise((resolve, reject) => {
      return fetch(`http://localhost:3000/api/${type}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(data)
      })
      .then(parseJSON)
      .then(() => resolve())
    })
  
  }

  function update(type, data, id){
     
    return new Promise((resolve, reject) => {
      return fetch(`http://localhost:3000/api/${type}/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify(data),
        path: id
        
      })
      .then(parseJSON)
      .then(() => resolve())
    })
  
  }
  
  function delele(type, id){
     
    return new Promise((resolve, reject) => {
      return fetch(`http://localhost:3000/api/${type}/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'delete',
        path: id
      })
      .then(() => resolve())
    })

  }

  function parseJSON(response) {
    return response.json();
  }
  
  const Connection = { search, create, update, delele };
  export default Connection;