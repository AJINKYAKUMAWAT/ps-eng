import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = currentPage * itemsPerPage + 1;
  const endItem = Math.min((currentPage + 1) * itemsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 0) setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setPage(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3; // Number of visible pages

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are small
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0); // Always show the first page

      if (currentPage > 1) {
        pages.push(-1); // Ellipsis
      }

      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push(-1); // Ellipsis
      }

      pages.push(totalPages - 1); // Always show the last page
    }

    return pages.map((page, index) => {
      if (page === -1) {
        return (
          <Text key={`ellipsis-${index}`} style={styles.ellipsis}>
            ...
          </Text>
        );
      }

      return (
        <TouchableOpacity
          key={page}
          style={[
            styles.pageNumber,
            currentPage === page && styles.activePage,
          ]}
          onPress={() => setPage(page)}>
          <Text style={{ color: currentPage === page ? '#fff' : '#4894FE' }}>
            {page + 1}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      {/* <Text style={styles.label}>
        Showing {startItem} to {endItem} of {totalItems}
      </Text> */}

      {/* Pagination Controls */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.iconButton, currentPage === 0 && styles.disabled]}
          onPress={handlePrevious}
          disabled={currentPage === 0}>
          <Icon name="chevron-left" size={20} color={currentPage === 0 ? '#ddd' : '#4894FE'} />
        </TouchableOpacity>

        {renderPageNumbers()}

        <TouchableOpacity
          style={[
            styles.iconButton,
            currentPage === totalPages - 1 && styles.disabled,
          ]}
          onPress={handleNext}
          disabled={currentPage === totalPages - 1}>
          <Icon
            name="chevron-right"
            size={20}
            color={currentPage === totalPages - 1 ? '#ddd' : '#4894FE'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4894FE',
  },
  disabled: {
    borderColor: '#ddd',
    backgroundColor: '#f7f7f7',
  },
  pageNumber: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginHorizontal: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4894FE',
  },
  activePage: {
    backgroundColor: '#4894FE',
  },
  ellipsis: {
    marginHorizontal: 5,
    fontSize: 16,
    color: '#333',
  },
});

export default CustomPagination;
