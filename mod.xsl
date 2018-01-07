<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/root" name="wurui.stock-detail">
        <!-- className 'J_OXMod' required  -->
        <div class="J_OXMod oxmod-stock-detail" ox-mod="stock-detail">
            <xsl:variable name="stock" select="data/maybelow-overview/i[1]"/>
            <ul class="slider">
                <li>
                    <div class="J_mainInfo" data-symbol="{$stock/symbol}">
                        <xsl:choose>
                            <xsl:when test="$stock/symbol">
                                <h3>
                                    <xsl:value-of select="$stock/company"/>
                                </h3>

                                <table class="maintable" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <th>Close</th>
                                            <td><xsl:value-of select="$stock/lastclose"/></td>
                                            <th>
                                                MarketCap
                                            </th>
                                            <td>
                                                <xsl:value-of select="format-number($stock/lastclose * $stock/issue div 1e9,'#.0')"/>B
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Avg</th>
                                            <td><xsl:value-of select="$stock/avg"/></td>
                                            <th>
                                                Percent
                                            </th>
                                            <td>
                                                <xsl:value-of select="format-number(($stock/lastclose - $stock/avg)  div $stock/avg,'#.00%')"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Med</th>
                                            <td><xsl:value-of select="$stock/med"/></td>
                                            <th>
                                                Percent
                                            </th>
                                            <td>
                                                <xsl:value-of select="format-number(($stock/lastclose - $stock/med)  div $stock/med,'#.00%')"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Lowest</th>
                                            <td>
                                                <xsl:value-of select="$stock/lowest"/>
                                            </td>
                                            <th>
                                                Highest
                                            </th>
                                            <td>
                                                <xsl:value-of select="$stock/highest"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Days</th>
                                            <td>
                                                <xsl:value-of select="$stock/days"/>
                                            </td>
                                            <th>
                                                Last Date
                                            </th>
                                            <td>
                                                <xsl:value-of select="$stock/date"/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </xsl:when>
                            <xsl:otherwise><div class="placeholder">no symbol</div></xsl:otherwise>
                        </xsl:choose>

                    </div>
                </li>
                <li>
                    <div class="J_historicalChart">
                        <div class="placeholder">loading...</div>
                    </div>
                </li>
                <li>
                    <div class="J_distributionChart">

                        <xsl:for-each select="$stock/sections/i">
                            <i class="section-item"><xsl:value-of select="."/></i>
                        </xsl:for-each>
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
