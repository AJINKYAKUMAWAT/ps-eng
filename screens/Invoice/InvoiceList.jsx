import React, {useCallback} from 'react';
import TableList from '../../components/common/TableList';
import {Text, View, StyleSheet} from 'react-native';
import {typography} from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

  const columns = defaultColumns(data);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Invoices</Text>
        <View style={styles.newInvoiceContainer}>
          <Text style={styles.newInvoiceText}>New Invoices</Text>
          <Icon
            name="plus-circle"
            size={20}
            color="#4894FE"
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.header2}>
        <Text style={{color: '#4894FE',fontFamily:typography.boldPoppins}}>Home/Invoices</Text>
      </View>
      <TableList data={data} colums={columns} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header2: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 15,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#303841',
    fontSize: 25,
    fontFamily: typography.primary,
  },
  newInvoiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newInvoiceText: {
    color: '#4894FE',
    fontSize: 15,
    fontFamily: typography.boldPoppins,
    marginRight: 5, // Add space between text and icon
    textDecorationLine: 'underline', // Adds underline
  },
  icon: {
    marginTop: 2, // Adjust the alignment to center the icon vertically
  },
});

export default InvoiceList;
