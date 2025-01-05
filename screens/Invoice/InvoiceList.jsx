import React, {useCallback} from 'react';
import TableList from '../../components/common/TableList';
import {Text} from 'react-native';

const data = [
  {
    key: 1,
    title: 'Cupcake',
    calories: 356,
    fat: 16,
    details: 'Delicious cupcake with vanilla frosting.',
  },
  {
    key: 2,
    title: 'Eclair',
    calories: 262,
    fat: 16,
    details: 'Chocolate-filled eclair with rich cream.',
  },
  {
    key: 3,
    title: 'Frozen yogurt',
    calories: 159,
    fat: 6,
    details: 'Low-fat frozen yogurt, perfect for summer.',
  },
  {
    key: 4,
    title: 'Gingerbread',
    calories: 305,
    fat: 3.7,
    details: 'Classic gingerbread with a spicy touch.',
  },
];
const InvoiceList = () => {
  const defaultColumns = useCallback(
    data => {
      return [
        {
          id: '1',
          title: 'Desert',
          data: data.map(i => <Text>{i.name}</Text>),
          collapse: true,
        },
        {
          id: '2',
          title: 'Calories',
          data: data.map(i => <Text>{i.calories}</Text>),
        },
        {
          id: '3',
          title: 'Fat',
          data: data.map(i => <Text>{i.fat}</Text>),
        },
        {
          id: '4',
          title: 'Action',
          data: data.map(i => <Text>{i.fat}</Text>),
        },
      ];
    },
    [data],
  );

  const columns = defaultColumns(data); // Call defaultColumns directly here

  return <TableList data={data} colums={columns} />;
};

export default InvoiceList;
