                                            
/*********************************************************************
 * COPYRIGHT Ericsson 2007                                            
 *                                                                    
 * The copyright to the computer program(s) herein is the property of 
 * Ericsson Inc. The programs may be used and/or copied only with     
 * written permission from Ericsson Inc. or in accordance with the    
 * terms and conditions stipulated in the agreement/contract under    
 * which the program(s) have been supplied.                           
 ********************************************************************/
                                                                      
package com.ericsson.iptv.portal.module.register;                     
                                                                      
import java.util.HashMap;                                             
import java.util.Map;                                                 
import com.ericsson.iptv.portal.fw.artifact.ArtifactBase;             
import com.ericsson.iptv.portal.fw.module.FwModuleRegister;           
import com.ericsson.iptv.portal.fw.module.def.Interface;              
import com.ericsson.iptv.portal.fw.module.def.Dependency;             
import com.ericsson.iptv.portal.fw.module.def.Version;                
import com.ericsson.iptv.portal.fw.module.def.CodeModuleDef;          
import com.ericsson.iptv.portal.fw.module.def.InterfaceModuleDef;     
import com.ericsson.iptv.portal.fw.module.def.AbstractionModuleDef;   
                                                                      
 /**                                                                  
  * Generated Java class that registers all JavaScript modules to the 
  * Portal FW.                                                        
  */                                                                  
public class AppServletContextListener extends ArtifactBase {         
    private static final Map<String,String> constraints4 = new HashMap<String,String>();
    private static final Map<String,String> constraints5 = new HashMap<String,String>();
    private static final Map<String,String> constraints7 = new HashMap<String,String>();
    private static final Map<String,String> constraints8 = new HashMap<String,String>();
    private static final Map<String,String> constraints9 = new HashMap<String,String>();
    static {
        constraints4.put("locale","en_us");
        constraints5.put("locale","hy_am");
        constraints7.put("locale","ru_ru");
        constraints8.put("aspect","16x9");
        constraints9.put("aspect","4x3");
    }
    private static final Interface[] ints0 = {
        new Interface("com.ericsson.iptv.portal.fw.interfaces.LoadingIF",new Version(1,0),null),
        new Interface("com.ericsson.iptv.portal.fw.interfaces.ViewIF",new Version(1,0),null),
    };
    private static final Dependency[] deps0 = {
        new Dependency("com.ericsson.iptv.portal.fw.lib.DomFactory",new Version(1,0)),
        new Dependency("com.ericsson.iptv.portal.fw.core.Log",new Version(1,0)),
        new Dependency("am.ucom.iptv.channelsort.skin.interfaces.SkinIF",new Version(1,0)),
    };
    private final CodeModuleDef def0 = new CodeModuleDef("am.ucom.iptv.channelsort.code.ChannelManagerPopup",new Version(1,0),"/am/ucom/iptv/channelsort/code/ChannelManagerPopup.js",ints0,deps0, new Dependency[0], new HashMap<String,String>());
    private static final Interface[] ints1 = {
        new Interface("com.ericsson.iptv.portal.fw.interfaces.LoadingIF",new Version(1,0),null),
        new Interface("com.ericsson.iptv.portal.coreapps.common.main.interfaces.BroadcastActionProviderIF",new Version(1,0),null),
    };
    private static final Dependency[] deps1 = {
        new Dependency("am.ucom.iptv.channelsort.lang.interfaces.LangIF",new Version(1,0)),
        new Dependency("com.ericsson.iptv.portal.fw.core.Log",new Version(1,0)),
        new Dependency("com.ericsson.iptv.portal.coreapps.common.data.interfaces.BroadcastTVIF",new Version(1,0)),
        new Dependency("com.ericsson.iptv.portal.fw.core.ViewManager",new Version(1,0)),
        new Dependency("am.ucom.iptv.channelsort.code.CustomSortMap",new Version(1,0)),
        new Dependency("com.ericsson.iptv.portal.fw.lib.PreferenceMgr",new Version(1,0)),
    };
    private final CodeModuleDef def1 = new CodeModuleDef("am.ucom.iptv.channelsort.code.ChannelSort",new Version(1,0),"/am/ucom/iptv/channelsort/code/ChannelSort.js",ints1,deps1, new Dependency[0], new HashMap<String,String>());
    private static final Interface[] ints2 = {
        new Interface("com.ericsson.iptv.portal.fw.interfaces.LoadingIF",new Version(1,0),null),
    };
    private final CodeModuleDef def2 = new CodeModuleDef("am.ucom.iptv.channelsort.code.CustomSortMap",new Version(1,0),"/am/ucom/iptv/channelsort/code/CustomSortMap.js",ints2,new Dependency[0], new Dependency[0], new HashMap<String,String>());
    private static final Interface[] ints3 = {
        new Interface("com.ericsson.iptv.portal.fw.interfaces.LoadingIF",new Version(1,0),null),
        new Interface("com.ericsson.iptv.portal.fw.interfaces.ViewIF",new Version(1,0),null),
    };
    private static final Dependency[] deps3 = {
        new Dependency("com.ericsson.iptv.portal.fw.lib.ActionManager",new Version(1,0)),
        new Dependency("com.ericsson.iptv.portal.fw.interfaces.DomFactoryIF",new Version(1,0)),
        new Dependency("com.ericsson.iptv.portal.coreapps.common.lang.interfaces.MessagesIF",new Version(1,0)),
        new Dependency("com.ericsson.iptv.portal.fw.core.ViewManager",new Version(1,0)),
        new Dependency("com.ericsson.iptv.portal.coreapps.common.skin.interfaces.SkinIF",new Version(1,0)),
    };
    private final CodeModuleDef def3 = new CodeModuleDef("am.ucom.iptv.channelsort.code.SelectSortPopup",new Version(1,0),"/am/ucom/iptv/channelsort/code/SelectSortPopup.js",ints3,deps3, new Dependency[0], new HashMap<String,String>());
    private static final Interface[] ints4 = {
        new Interface("am.ucom.iptv.channelsort.lang.interfaces.LangIF",new Version(1,0),null),
    };
    private final CodeModuleDef def4 = new CodeModuleDef("am.ucom.iptv.channelsort.lang.en_us.Lang",new Version(1,0),"/am/ucom/iptv/channelsort/lang/en_us/Lang.js",ints4,new Dependency[0], new Dependency[0], constraints4);
    private static final Interface[] ints5 = {
        new Interface("am.ucom.iptv.channelsort.lang.interfaces.LangIF",new Version(1,0),null),
    };
    private final CodeModuleDef def5 = new CodeModuleDef("am.ucom.iptv.channelsort.lang.hy_am.Lang",new Version(1,0),"/am/ucom/iptv/channelsort/lang/hy_am/Lang.js",ints5,new Dependency[0], new Dependency[0], constraints5);
    private final AbstractionModuleDef def6 = new AbstractionModuleDef("am.ucom.iptv.channelsort.lang.interfaces.LangIF",new Version(1,0),"/am/ucom/iptv/channelsort/lang/interfaces/LangIF.js",new Interface[0],new Dependency[0], new Dependency[0], new HashMap<String,String>());
    private static final Interface[] ints7 = {
        new Interface("am.ucom.iptv.channelsort.lang.interfaces.LangIF",new Version(1,0),null),
    };
    private final CodeModuleDef def7 = new CodeModuleDef("am.ucom.iptv.channelsort.lang.ru_ru.Lang",new Version(1,0),"/am/ucom/iptv/channelsort/lang/ru_ru/Lang.js",ints7,new Dependency[0], new Dependency[0], constraints7);
    private static final Interface[] ints8 = {
        new Interface("am.ucom.iptv.channelsort.skin.interfaces.SkinIF",new Version(1,0),null),
    };
    private final CodeModuleDef def8 = new CodeModuleDef("am.ucom.iptv.channelsort.skin.esdp.css.Skin16x9",new Version(1,0),"/am/ucom/iptv/channelsort/skin/esdp/css/Skin16x9.js",ints8,new Dependency[0], new Dependency[0], constraints8);
    private static final Interface[] ints9 = {
        new Interface("am.ucom.iptv.channelsort.skin.interfaces.SkinIF",new Version(1,0),null),
    };
    private final CodeModuleDef def9 = new CodeModuleDef("am.ucom.iptv.channelsort.skin.esdp.css.Skin4x3",new Version(1,0),"/am/ucom/iptv/channelsort/skin/esdp/css/Skin4x3.js",ints9,new Dependency[0], new Dependency[0], constraints9);
    private final AbstractionModuleDef def10 = new AbstractionModuleDef("am.ucom.iptv.channelsort.skin.interfaces.SkinIF",new Version(1,0),"/am/ucom/iptv/channelsort/skin/interfaces/SkinIF.js",new Interface[0],new Dependency[0], new Dependency[0], new HashMap<String,String>());
    private static final Interface[] ints11 = {
        new Interface("com.ericsson.iptv.portal.fw.interfaces.LoadingIF",new Version(1,0),null),
        new Interface("com.ericsson.iptv.portal.fw.interfaces.ViewIF",new Version(1,0),null),
    };
    private static final Dependency[] deps11 = {
        new Dependency("com.ericsson.iptv.portal.fw.lib.ActionManager",new Version(1,0)),
        new Dependency("com.ericsson.iptv.portal.fw.interfaces.DomFactoryIF",new Version(1,0)),
        new Dependency("com.ericsson.iptv.portal.coreapps.common.lang.interfaces.MessagesIF",new Version(1,0)),
        new Dependency("com.ericsson.iptv.portal.fw.core.ViewManager",new Version(1,0)),
        new Dependency("am.ucom.iptv.channelsort.skin.interfaces.SkinIF",new Version(1,0)),
    };
    private final CodeModuleDef def11 = new CodeModuleDef("com.ericsson.iptv.portal.coreapps.common.popup.view.SelectWithInfoPopup",new Version(1,0),"/com/ericsson/iptv/portal/coreapps/common/popup/view/SelectWithInfoPopup.js",ints11,deps11, new Dependency[0], new HashMap<String,String>());
                                            
    public void init() {                                              
        FwModuleRegister register = getModuleRegister();              
        register.register(def0);
        register.register(def1);
        register.register(def2);
        register.register(def3);
        register.register(def4);
        register.register(def5);
        register.register(def6);
        register.register(def7);
        register.register(def8);
        register.register(def9);
        register.register(def10);
        register.register(def11);
    }                                       
                                                                      
    public void destroy() {                                           
        FwModuleRegister register = getModuleRegister();              
        register.unregister(def0);
        register.unregister(def1);
        register.unregister(def2);
        register.unregister(def3);
        register.unregister(def4);
        register.unregister(def5);
        register.unregister(def6);
        register.unregister(def7);
        register.unregister(def8);
        register.unregister(def9);
        register.unregister(def10);
        register.unregister(def11);
    }                                       
}                                                                     
