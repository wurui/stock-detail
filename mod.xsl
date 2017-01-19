<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/root" name="wurui.stock-detail">
        <xsl:param name="qs">symbol</xsl:param>
        <!-- className 'J_OXMod' required  -->
        <div class="J_OXMod oxmod-stock-detail" ox-mod="stock-detail" data-qs="{$qs}">
            <ul class="slider">

                <li>
                    <div class="J_mainInfo">

                    </div>
                </li>
                <li>
                    <div class="J_historicalChart">
                        <div class="placeholder">loading...</div>
                    </div>
                </li>
                <li>
                    <div class="J_distributionChart">
                        <div class="placeholder">loading...</div>
                    </div>
                </li>

            </ul>
            <script type="text/tpl" class="TPL_main"><![CDATA[
            {{^symbol}}<div class="placeholder">no symbol</div>{{/symbol}}
            {{#symbol}}
            <h3 data-key="name">{{name}}</h3>
            <table class="maintable" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <th>Close</th>
                        <td data-key="lastPrice">{{lastPrice}}</td>
                        <th>
                            MarketCap
                        </th>
                        <td data-key="marketcap">
                            {{marketcap}}
                        </td>
                    </tr>
                    <tr>
                        <th>Avg</th>
                        <td data-key="avg">{{avg}}</td>
                        <th>
                            Percent
                        </th>
                        <td data-key="avgPercent">
                            {{avgPercent}}
                        </td>
                    </tr>
                    <tr>
                        <th>Med</th>
                        <td data-key="med">{{med}}</td>
                        <th>
                            Percent
                        </th>
                        <td data-key="medPercent">
                            {{medPercent}}
                        </td>
                    </tr>
                    <tr>
                        <th>Frequent</th>
                        <td data-key="frequent">{{frequent}}</td>
                        <th>
                            Probability
                        </th>
                        <td data-key="frequentPercent">
                            {{frequentPercent}}
                        </td>
                    </tr>
                    <tr>
                        <th>Range</th>
                        <td data-key="range">{{range}}</td>
                        <th>
                            Last Date
                        </th>
                        <td data-key="lastDate">
                            {{lastDate}}
                        </td>
                    </tr>
                </tbody>
            </table>{{/symbol}}
            ]]>
            </script>
        </div>

    </xsl:template>

</xsl:stylesheet>
