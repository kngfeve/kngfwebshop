'use strict';

angular.module('kngfwebshopApp')
  .filter('productfilter', function($filter) {
	  return function(products, search, selection) {
  		// default case
	    if (!search && !selection) {
	    	return products;
	    }
    	// return products matching the criterias
	    if (!search && selection.category && selection.subcategory) {	
	    	return $filter('filter')(products, {groupID: selection.category, marketGroupID: selection.subcategory});
	    }

	    // search	    	    
	    var arrSearch = search.split(' ');
	    var lookup = '';
	    var result = [];	

			arrSearch.forEach(function(item) {

			  lookup = $filter('filter')(products, {typeName: item});
			  if (lookup.length > 0) {
					result = result.concat(lookup);
				}
	    });	    
	    return result;
	  };
  });
