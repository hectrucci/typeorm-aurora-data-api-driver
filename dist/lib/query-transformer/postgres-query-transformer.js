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
exports.PostgresQueryTransformer = void 0;
var query_transformer_1 = require("./query-transformer");
var uuid_1 = require("uuid");
var PostgresQueryTransformer = /** @class */ (function (_super) {
    __extends(PostgresQueryTransformer, _super);
    function PostgresQueryTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PostgresQueryTransformer.prototype.transformQuery = function (query) {
        var quoteCharacters = ["'", '"'];
        var newQueryString = '';
        var currentQuote = null;
        for (var i = 0; i < query.length; i += 1) {
            var currentCharacter = query[i];
            var currentCharacterEscaped = i !== 0 && query[i - 1] === '\\';
            if (currentCharacter === '$' && !currentQuote) {
                newQueryString += ':param_';
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
    PostgresQueryTransformer.prototype.transformParameters = function (parameters) {
        if (!parameters) {
            return parameters;
        }
        return parameters.map(function (parameter, index) {
            var _a;
            var paramName = "param_" + (index + 1);
            if (uuid_1.validate(parameter)) {
                return {
                    name: paramName,
                    value: parameter,
                    cast: 'uuid',
                };
            }
            return _a = {}, _a[paramName] = parameter, _a;
        });
    };
    return PostgresQueryTransformer;
}(query_transformer_1.QueryTransformer));
exports.PostgresQueryTransformer = PostgresQueryTransformer;
//# sourceMappingURL=postgres-query-transformer.js.map