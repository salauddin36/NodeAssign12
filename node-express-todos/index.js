// Express
import express from 'express';

const app = express();
app.use(express.json()); 
const db = {
    todos: [],
}

app.get('/todos', (req, res) => {
    res.status(200).json({
        data: {
            todos: db.todos
        }
    });
});

app.post('/todo', (req, res) => {
    const { text } = req.body;

    const todo = {
        id: db.todos.length + 1,
        text,
    }

    db.todos.push(todo);

    res.status(201).json({
        data: {
            message: 'Todo Created Successfully'
        }
    });
});

// Update a todo
app.put('/todo/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    const todo = db.todos.find((todo) => todo.id == id);

    if (!todo) {
        res.status(404).json({
            data: {
                message: 'Todo Not Found',
            }
        });
    } else {
        todo.text = text;

        res.status(200).json({
            data: {
                message: 'Todo Updated Successfully',
            }
        });
    }
});


app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;

    const todo = db.todos.find((todo) => todo.id == id);

    if (!todo) {
        res.status(404).json({
            data: {
                message: 'Todo Not Found',
            }
        });
    } else {
        const index = db.todos.indexOf(todo);
        db.todos.splice(index, 1);

        res.status(200).json({
            data: {
                message: 'Todo Deleted Successfully',
            }
        });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
