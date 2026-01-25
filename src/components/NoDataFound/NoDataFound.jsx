import React from 'react';
import { Empty, Button, Typography } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const { Text } = Typography;

const NoArticlesFound = ({ resetFilters }) => {
  const themeColor = "#214a78";
  
  return (
    <div  className="text-center p-6 bg-white rounded shadow-sm">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <Text strong style={{ fontSize: '16px' }}>
            No Articles Found
          </Text>
        }
      />
      
      <Button 
        type="primary" 
        icon={<FilterOutlined />} 
        onClick={resetFilters}
        size="middle"
        style={{ 
          backgroundColor: themeColor, 
          borderColor: themeColor,
          marginTop: '16px' 
        }}
      >
        Clear Filters
      </Button>

      
    </div>
  );
};

export default NoArticlesFound;