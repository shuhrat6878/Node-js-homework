import express from 'express';
import { read, write } from './write-read.js';

const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const users = await read();
    const newUser = {
      id: !users.length ? 1 : users.at(-1).id + 1,
      ...req.body
    };
    users.push(newUser);
    await write(users);
    return res.status(200).json({
      data: newUser
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "xatolik yuz berdi"
    });
  }
});

app.get ('/', async(req,res)=>{
    try {
        const users = await read();
        return res.status(201).json({
            data : users
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "xatolik yuz berdi"
        });
    }
});

app.get ('/:id', async (req,res)=>{
    try {
        const id = +req.params.id;
        const users  = await read();
        const user = users.find ((user)=> user.id === id);
        if (!user){
            return res.status(404).json({
                message: "foydalanuvshi topilmadi"
            });
        }
        return res.status(200).json({
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "xatolik yuz berdi"
        });
        
    }
});
app.put('/:id', async (req, res) => {
  try {
    const id = +req.params.id;
    const users = await read();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({
        message: "foydalanuvchi topilmadi"
      });
    }
    users[userIndex] = { id, ...req.body };
    await write(users);
    return res.status(200).json({
      data: users[userIndex]
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "xatolik yuz berdi"
    });
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const id = +req.params.id;
    const users = await read();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({
        message: "foydalanuvchi topilmadi"
      });
    }
    users.splice(userIndex, 1);
    await write(users);
    return res.status(200).json({
      message: "foydalanuvchi o'chirildi"
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "xatolik yuz berdi"
    });
    }
});

app.listen(3000, () => {
  console.log("Server 3000 portda ishlayapti");
});


