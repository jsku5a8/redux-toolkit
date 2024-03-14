import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { fetchTodos, createTodo } from '../../redux/features/todoSlice.ts';
import { TodoType } from '../../types/index.ts';

const TodoList = () => {
	const [name, setName] = useState<string>('');
	const [text, setText] = useState<string>('');
	const { data, loading } = useAppSelector((state) => state.todo);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTodos());
	}, []);

	const handleAddTodo = async () => {
		const newTodo: TodoType = {
			name,
			text
		};
		await dispatch(createTodo(newTodo));
		dispatch(fetchTodos());
	};

	return (
		<>
			<div>
				<h3>TodoList</h3>
				<input
					type="text"
					placeholder="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button onClick={handleAddTodo}>Add Todo</button>
				{loading ? (
					<h1>Loading...</h1>
				) : (
					<div>
						{data.map((item) => (
							<div key={item._id}>
								<h1>{item.name}</h1>
								<p>{item.text}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default TodoList;
