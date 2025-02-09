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
import {dynamicRows} from '../../utils/constant';
import CustomPagination from './CustomPagination';
import {Loader} from '../../AtomicComponents/Loader';

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
  loading,
  dynamicRows,
  pagination,
  rendor
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

  if (loading) {
    return (
      <View
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          marginTop: '50%',
        }}>
        <Loader />
      </View>
    );
  }

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
            {columns?.map(column => (
              <DataTable.Title
                key={column.id}
                style={{justifyContent: 'center'}}
                textStyle={{color: '#000', fontSize: 12}}
                onPress={() => handleSort(column)} // Ensure correct column key is used
              >
                {column.title}
                {column.sortable && (
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
                    size={14}
                  />
                )}
              </DataTable.Title>
            ))}
          </DataTable.Header>

          {/* Table Rows */}
          {filteredData.map((item, index) => {
            return (
              <View key={index}>
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

                    {Object.keys(dynamicRows).map((key, index) => {
                      const value = item[dynamicRows[key]] || ''; // Fallback for undefined values
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
                          onPress={() => onDelete(item.Sr)}
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

               { rendor(expandedRows,item)}
              </View>
            );
          })}

          {/* Pagination Component */}
          {pagination && (
            <CustomPagination
              totalItems={total}
              itemsPerPage={itemsPerPage}
              currentPage={page}
              setPage={setPage}
            />
          )}
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
