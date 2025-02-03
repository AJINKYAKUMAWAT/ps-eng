/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {DataTable, Text, Searchbar, TouchableRipple} from 'react-native-paper';
import {
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {InvoiceListData} from '../../utils/constant';
import CustomPagination from './CustomPagination';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TableList = ({
  data,
  columns,
  enableSearch,
  onPress,
  onDelete,
  total,
  setQueryParams,
  queryParams,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRows, setExpandedRows] = useState({}); // Track expanded rows
  const [filteredData, setFilteredData] = useState(data);
  const [numberOfItemsPerPageList] = useState([10, 20, 30]);
  const [page, setPage] = useState(1);

  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );

  // Search filter
  useEffect(() => {
    if (searchQuery) {
      const filtered = data.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
    // setPage(0);
  }, [searchQuery, data]);

  useEffect(() => {
    setPage(1);
  }, [itemsPerPage]);

  useEffect(() => {
    setQueryParams(prev => ({
      ...prev,
      currentPage: page + 1, // Ensure this updates correctly
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Sorting function
  const handleSort = columnKey => {
    if (queryParams.orderPar === columnKey.field) {
      setQueryParams(prev => ({
        ...prev,
        orderPar: columnKey.field,
        order: queryParams.order === 'ASC' ? 'DESC' : 'ASC',
      }));
    } else {
      setQueryParams(prev => ({
        ...prev,
        orderPar: columnKey.field,
        order: 'ASC',
      }));
    }
  };

  // Expand/Collapse row
  const toggleRow = key => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedRows(prev => {
      // Close all other rows and only open the clicked row
      const newState = {};
      newState[key] = !prev[key];
      return newState;
    });
  };

  console.log('columns', columns);

  return (
    <ScrollView style={{marginBottom: 150}}>
      <View>
        {enableSearch && (
          <View style={{padding: 10}}>
            <Searchbar
              style={{backgroundColor: '#fff'}}
              placeholderTextColor="#C4C4C4"
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </View>
        )}

        <DataTable>
          {/* Table Headers */}
          <DataTable.Header>
            {columns.map(column => (
              <DataTable.Title
                key={column.id}
                style={{justifyContent: 'center'}}
                textStyle={{color: '#000', fontSize: 15}}
                onPress={() => handleSort(column)} // Ensure correct column key is used
              >
                {column.title}
                <Icon
                  name={
                    queryParams.order === 'ASC' &&
                    queryParams.orderPar === column.field
                      ? 'arrow-up'
                      : 'arrow-down'
                  }
                  color={
                    queryParams.orderPar === column.field
                      ? '#4894FE'
                      : '#C4C4C4'
                  } // Change color here
                  size={16}
                />
              </DataTable.Title>
            ))}
          </DataTable.Header>

          {/* Table Rows */}
          {filteredData.map(item => {
            return (
              <View key={item.Sr}>
                <TouchableRipple>
                  <DataTable.Row>
                    <Icon
                      onPress={() => toggleRow(item.Sr)}
                      name={
                        expandedRows[item.Sr] ? 'chevron-down' : 'chevron-right'
                      }
                      color="#000"
                      size={15}
                      style={{marginRight: 10, marginTop: 15}}
                    />

                    {Object.keys(InvoiceListData).map((key, index) => {
                      const value = item[InvoiceListData[key]] || ''; // Fallback for undefined values
                      return (
                        <DataTable.Cell key={index}>
                          <Text style={{color: '#000', fontSize: 12}}>
                            {value}
                          </Text>
                        </DataTable.Cell>
                      );
                    })}

                    {/* Action Buttons */}
                    <DataTable.Cell>
                      <View style={styles.actions}>
                        <Icon
                          onPress={onPress}
                          name="square-edit-outline"
                          color="#4894FE"
                          size={20}
                        />
                        <Icon
                          onPress={onDelete}
                          name="trash-can-outline"
                          color="#f94944"
                          size={20}
                        />
                        <Icon
                          name="printer-outline"
                          color="#959493"
                          size={20}
                        />
                      </View>
                    </DataTable.Cell>
                  </DataTable.Row>
                </TouchableRipple>

                {/* Expandable Row */}
                {expandedRows[item.Sr] && (
                  <View style={styles.collapsibleContent}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {/* Left Column */}
                      <View style={{flex: 1, paddingRight: 10}}>
                        <View style={styles.row}>
                          <Text style={styles.label}>
                            GSTN <Text style={styles.value}>{item.GSTin}</Text>
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.label}>
                            Credit Period{' '}
                            <Text style={styles.value}>
                              {item.creditPeriod
                                ? `${item.creditPeriod} Days`
                                : 0}
                            </Text>
                          </Text>
                        </View>
                      </View>

                      {/* Divider */}
                      <View style={styles.divider} />

                      {/* Right Column */}
                      <View style={{flex: 1}}>
                        <View style={styles.row}>
                          <Text style={styles.label}>Taxable ₹ : </Text>
                          <Text style={styles.value}>
                            {item.totTaxableAmount}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.label}>CGST (9%) : </Text>
                          <Text style={styles.value}>{item.totCGST}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.label}>SGST (9%) : </Text>
                          <Text style={styles.value}>{item.totSGST}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.label}>IGST (9%) : </Text>
                          <Text style={styles.value}>{item.totIGST}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.label}>Grand Tot : </Text>
                          <Text style={styles.value}>{item.grandTotal}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.label}>Tot Received : </Text>
                          <Text style={styles.value}>
                            {item.receivedAmount}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.label}>Balance : </Text>
                          <Text style={styles.value}>{item.balanceAmount}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            );
          })}

          {/* Pagination Component */}
          <CustomPagination
            totalItems={total}
            itemsPerPage={itemsPerPage}
            currentPage={page}
            setPage={setPage}
          />
        </DataTable>
      </View>
    </ScrollView>
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
    marginBottom: 8,
  },
  label: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'right',
  },
  value: {
    color: '#4894FE',
    fontSize: 11,
    textAlign: 'left',
  },
  divider: {
    width: 1,
    backgroundColor: '#ddd',
    height: '100%',
    marginHorizontal: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default TableList;
