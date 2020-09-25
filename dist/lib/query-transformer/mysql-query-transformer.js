"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlQueryTransformer = void 0;
var query_transformer_1 = require("./query-transformer");
var MysqlQueryTransformer = /** @class */ (function (_super) {
    __extends(MysqlQueryTransformer, _super);
    function MysqlQueryTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MysqlQueryTransformer.prototype.transformQuery = function (query, parameters) {
        var quoteCharacters = ["'", '"'];
        var newQueryString = '';
        var currentQuote = null;
        var srcIndex = 0;
        var destIndex = 0;
        for (var i = 0; i < query.length; i += 1) {
            var currentCharacter = query[i];
            var currentCharacterEscaped = i !== 0 && query[i - 1] === '\\';
            if (currentCharacter === '?' && !currentQuote) {
                var parameter = parameters[srcIndex];
                if (Array.isArray(parameter)) {
                    var additionalParameters = parameter.map(function (_, index) {
                        return ":param_" + (destIndex + index);
                    });
                    newQueryString += additionalParameters.join(', ');
                    destIndex += additionalParameters.length;
                }
                else {
                    newQueryString += ":param_" + destIndex;
                    destIndex += 1;
                }
                srcIndex += 1;
            }
            else {
                newQueryString += currentCharacter;
                if (quoteCharacters.includes(currentCharacter) && !currentCharacterEscaped) {
                    if (!currentQuote) {
                        currentQuote = currentCharacter;
                    }
                    else if (currentQuote === currentCharacter) {
                        currentQuote = null;
                    }
                }
            }
        }
        return newQueryString;
    };
    MysqlQueryTransformer.prototype.expandArrayParameters = function (parameters) {
        return parameters.reduce(function (expandedParameters, parameter) {
            if (Array.isArray(parameter)) {
                expandedParameters.push.apply(expandedParameters, parameter);
            }
            else {
                expandedParameters.push(parameter);
            }
            return expandedParameters;
        }, []);
    };
    MysqlQueryTransformer.prototype.transformParameters = function (parameters) {
        if (!parameters) {
            return parameters;
        }
        var expandedParameters = this.expandArrayParameters(parameters);
        return [expandedParameters.reduce(function (params, parameter, index) {
                params["param_" + index] = parameter;
                return params;
            }, {})];
    };
    return MysqlQueryTransformer;
}(query_transformer_1.QueryTransformer));
exports.MysqlQueryTransformer = MysqlQueryTransformer;
//# sourceMappingURL=mysql-query-transformer.js.map