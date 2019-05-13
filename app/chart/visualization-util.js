// function VisualizationUtils() {

//     return {
//         normalize: normalize,
//         sortBySequenceNumber: sortBySequenceNumber,
//         getFieldPropertyValue: getFieldPropertyValue,
//         getPropertyValue: getPropertyValue,
//         getDimensionsAndMeasures: getDimensionsAndMeasures,
//         getFormattedNumber: getFormattedNumber
//     };

//     function getFormattedNumber(value, format) {
//         switch (format) {
//             case 'Actual':
//                 return value;
//             case 'K':
//                 return value / 1000;
//             case 'M':
//                 return value / 1000000;
//             case 'B':
//                 return value / 1000000000;
//             case 'Percent':
//                 return value;
//             default:
//                 return value;

//         }
//     }

//     function isFunction(obj) {
//         return !!(obj && obj.constructor && obj.call && obj.apply);
//     }



//     function getPropertyValue(properties, propertyName, orElse) {
//         var properties = properties.filter(function (item) {
//             return item.propertyType.name === propertyName;
//         });
//         var property = properties[0];

//         if (!property) {
//             if (isFunction(orElse)) {
//                 return orElse();
//             } else {
//                 return orElse;
//             }
//         } else {
//             if (property.value && property.value.value) {
//                 return property.value.value
//             } else {
//                 return property.value;
//             }
//         }
//     }

//     function getFieldPropertyValue(field, propertyName, orElse) {
//         return getPropertyValue(field.properties, propertyName, orElse);
//     }

//     /**
//      * Normalize data according to given range
//      *
//      * @param {any} values array of values
//      * @param {any} lowBoundry left side of interval
//      * @param {any} highBoundry right side of interval
//      * @param {any} x value to be normalized
//      * @returns normalized value to given interval
//      */
//     function normalize(values, lowBoundry, highBoundry, x) {
//         var maxValue = values.reduce(function (a, b) {
//             return Math.max(a, b);
//         });

//         var minValue = values.reduce(function (a, b) {
//             return Math.min(a, b);
//         });
//         var xStd = (x - minValue) / (maxValue - minValue);

//         return xStd * (highBoundry - lowBoundry) + lowBoundry;
//     }

function sortBySequenceNumber(a, b) {
        return a.order - b.order;
    }
function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}    
const VisualizationUtils = {

    getPropertyValue : function (properties, propertyName, orElse) {
        var properties = properties.filter(function (item) {
            return item.propertyType.name === propertyName;
        });
        var property = properties[0];

        if (!property) {
            if (isFunction(orElse)) {
                return orElse();
            } else {
                return orElse;
            }
        } else {
            if (property.value && property.value.value) {
                return property.value.value
            } else {
                return property.value;
            }
        }
    },

    getFieldPropertyValue :    function (field, propertyName, orElse) {
        return this.getPropertyValue(field.properties, propertyName, orElse);
    } ,    

    getDimensionsAndMeasures : function (fields) {
        var dimensions = fields.filter(function (item) {
            return item.feature && item.feature.featureType === 'DIMENSION';
        }).map(function (item) {
            var newItem = {};
            // angular.copy(item, newItem);
            newItem=JSON.parse(JSON.stringify(item));
            newItem.feature.name = newItem.feature.name.toLowerCase();
            return newItem;
        }).sort(function (a, b) {
            return sortBySequenceNumber(a.fieldType, b.fieldType);
        });

        var measures = fields.filter(function (item) {
                return item.feature && item.feature.featureType === 'MEASURE'
            }).map(function (item) {
                var newItem = {};
                newItem=JSON.parse(JSON.stringify(item));
                newItem.feature.name = newItem.feature.name.toLowerCase();
                return newItem;
            })
            .sort(function (a, b) {
                return sortBySequenceNumber(a.fieldType, b.fieldType);
            });
        return {
            measures: measures,
            dimensions: dimensions
        };
    },

    getNames: function(arr) {
        return arr.map(function(item) {
            return item.feature.name;
        });
    },


}

module.exports= VisualizationUtils;