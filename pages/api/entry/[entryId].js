export default async function handler(req, res) {
  switch(req.method) {
    case 'PATCH':
      console.log(req.body);
      return res.status(201).json({message: 'oops'})
      break;
  }
}