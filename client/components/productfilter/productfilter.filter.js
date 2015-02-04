'use strict';

angular.module('kngfwebshopApp')
  .filter('productfilter', function ($filter) {
	  return function(products, search, selection) {
  		// default case
	    if (!search && !selection) {
	    	return products;
	    }
    	// return products matching the criterias frigates
	    if (!search && selection.metalevel && selection.type) {	
	    	return $filter('filter')(products, {metalevel: selection.metalevel, type: selection.type});
	    }	    	    
	    var arrSearch = search.split(' ');
	    var lookup = '';
	    var result = [];	

			arrSearch.forEach(function(item) {
			  lookup = $filter('filter')(products, {'name': item});
			  console.log(lookup);
			  if (lookup.length > 0) {
					result = result.concat(lookup);
				}
	    });	    
	    return result;
	  };
  });
