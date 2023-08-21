// Express
import express from 'express';

const app = express();
app.use(express.json());

const db = {
    users: [],
}

// get all users
app.get('/users', (req, res) => {
    res.status(200).json({
        data: {
            users: db.users
        }
    });
});

// get single user
app.get('/user/:id', (req, res) => {
    const { id } = req.params;

    const user = db.users.find((user) => user.id == id);

    if (!user) {
        res.status(404).json({
            data: {
                message: 'User Not Found',
            }
        });
    } else {
        res.status(200).json({
            id: user.id,
            name: user.name,
            age: user.age,
            city: user.city,
        });
    }
});

// create user
app.post('/user', (req, res) => {
    const { name, age, city } = req.body;

    const user = {
        id: db.users.length + 1,
        name,
        age,
        city,
    }

    db.users.push(user);

    res.status(201).json({
        data: {
            message: 'User Added Successfully'
        }
    });
});

// update existing user
app.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, city } = req.body;

    const user = db.users.find((user) => user.id == id);

    if (!user) {
        res.status(404).json({
            data: {
                message: 'User Not Found',
            }
        });
    } else {
        user.name = name;
        user.age = age;
        user.city = city;

        res.status(200).json({
            data: {
                message: 'User Updated Successfully',
            }
        });
    }
});


// delete user
app.delete('/user/:id', (req, res) => {
    const { id } = req.params;

    const user = db.users.find((user) => user.id == id);

    if (!user) {
        res.status(404).json({
            data: {
                message: 'User Not Found',
            }
        });
    } else {
        const index = db.users.indexOf(user);
        db.users.splice(index, 1);

        res.status(200).json({
            data: {
                message: 'User Deleted Successfully',
            }
        });
    }
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
