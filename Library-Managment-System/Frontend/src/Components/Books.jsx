import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, List, Button, Typography, Spin } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const Books = () => {
    const { categoryId } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/student/getAllBooksByCategories/${categoryId}`)
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-3xl">
        <Title level={2} className="text-center">Books</Title>
        <List
          itemLayout="horizontal"
          dataSource={books}
          renderItem={book => (
            <List.Item
              actions={[
                <Button type="primary">Add Book</Button>
              ]}
            >
              <List.Item.Meta
                title={<span className="text-lg font-semibold">{book.bookname}</span>}
                description={`Author: ${book.bookAuthor}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default Books