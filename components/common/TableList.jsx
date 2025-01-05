import React, {useState} from 'react';
import {DataTable, Divider, Text, TouchableRipple} from 'react-native-paper';
import {
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {InvoiceListData} from '../../utils/constant';
import {Searchbar} from 'react-native-paper';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TableList = ({data, colums}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortDirection, setSortDirection] = useState(null); // null | 'ascending' | 'descending'
  const [sortedColumn, setSortedColumn] = useState(null);
  const [expandedRows, setExpandedRows] = useState({}); // Track expanded rows
  const [items, setItems] = useState([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
      details: 'Delicious cupcake with vanilla frosting.',
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
      details: 'Chocolate-filled eclair with rich cream.',
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
      details: 'Low-fat frozen yogurt, perfect for summer.',
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
      details: 'Classic gingerbread with a spicy touch.',
    },
  ]);

  const handleSort = column => {
    let newSortDirection = null;
    if (sortedColumn === column) {
      newSortDirection =
        sortDirection === 'ascending' ? 'descending' : 'ascending';
    } else {
      newSortDirection = 'ascending';
    }

    setSortDirection(newSortDirection);
    setSortedColumn(column);

    const sortedItems = [...items].sort((a, b) => {
      if (newSortDirection === 'ascending') {
        return a[column] > b[column] ? 1 : -1;
      }
      return a[column] < b[column] ? 1 : -1;
    });

    setItems(sortedItems);
  };

  const toggleRow = key => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Smooth animation
    setExpandedRows(prevState => ({
      ...prevState,
      [key]: !prevState[key], // Toggle expanded state
    }));
  };

  return (
    <View>
      <View style={{padding: 10}}>
        <Searchbar
          style={{backgroundColor: '#fff'}}
          placeholderTextColor="#C4C4C4"
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>

      <DataTable>
        <DataTable.Header>
          {colums &&
            colums.map(item => {
              return (
                <DataTable.Title
                  key={item.id}
                  style={{justifyContent: 'center'}}
                  textStyle={{color: '#000', fontSize: 15}}
                  onPress={() => handleSort('name')}
                  sortDirection={
                    sortedColumn === 'name' ? sortDirection : null
                  }>
                  {item.title}
                </DataTable.Title>
              );
            })}
        </DataTable.Header>

        {data.map(item => (
          <View key={item.key}>
            <TouchableRipple>
              <DataTable.Row>
                <Icon
                  onPress={() => toggleRow(item.key)}
                  name={
                    expandedRows[item.key] ? 'chevron-down' : 'chevron-right'
                  }
                  color="#000"
                  size={15}
                  style={{marginRight: 10, marginTop: 15}}
                />

                {Object.keys(InvoiceListData).map((key, index) => (
                  <DataTable.Cell key={index}>
                    <Text style={{color: '#000'}}>
                      {item[InvoiceListData[key]]}{' '}
                    </Text>
                  </DataTable.Cell>
                ))}
                <DataTable.Cell>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="square-edit-outline"
                      color="#4894FE"
                      size={20}
                      style={{marginHorizontal: 2}}
                    />
                    <Icon
                      name="trash-can-outline"
                      color="#f94944"
                      size={20}
                      style={{marginHorizontal: 2}}
                    />
                    <Icon
                      name="printer-outline"
                      color="#959493"
                      size={20}
                      style={{marginHorizontal: 2}}
                    />
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            </TouchableRipple>
            {expandedRows[item.key] && (
              <View style={styles.collapsibleContent}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* Left Column */}
                  <View style={{flex: 1, paddingRight: 10}}>
                    <View style={styles.row}>
                      <Text style={styles.label}>
                        GSTN <Text style={styles.value}>in/ps/24-25/206 </Text>
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>
                        Credit Period{' '}
                        <Text style={styles.value}>(25 Days)</Text>
                      </Text>
                    </View>
                  </View>

                  {/* Divider */}
                  <View style={styles.divider} />

                  {/* Right Column */}
                  <View style={{flex: 1}}>
                    <View style={styles.row}>
                      <Text style={styles.label}>Taxable ₹ : </Text>
                      <Text style={styles.value}>50,000</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>CGST (9%) : </Text>
                      <Text style={styles.value}>4,500</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>SGST (9%) : </Text>
                      <Text style={styles.value}>4,500</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>IGST (9%) : </Text>
                      <Text style={styles.value}>0</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>Grand Tot : </Text>
                      <Text style={styles.value}>59,000</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>Tot Received : </Text>
                      <Text style={styles.value}>40,000</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.label}>Balance : </Text>
                      <Text style={styles.value}>19,000</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  collapsibleContent: {
    padding: 20,
    backgroundColor: '#F7F7F7',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8, // Space between rows
  },
  label: {
    color: '#333333',
    fontWeight: 'bold',
    flex: 1, // Allows labels to align neatly
    fontSize: 11,
    textAlign: 'right',
  },
  value: {
    color: '#4894FE',
    flex: 1, // Values align neatly with labels
    fontSize: 11,
    textAlign: 'left',
  },
  divider: {
    width: 1,
    backgroundColor: '#ddd',
    height: '100%', // Full height divider
    marginHorizontal: 10, // Space between columns
  },
});

export default TableList;
