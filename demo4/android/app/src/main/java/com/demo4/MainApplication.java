package com.demo4;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.react.rnspinkit.RNSpinkitPackage;
import com.rnfs.RNFSPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.dooboolab.RNAudioRecorderPlayerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.zmxv.RNSound.RNSoundPackage;
import com.dooboolab.RNAudioRecorderPlayerPackage;
public class MainApplication extends NavigationApplication {

            @Override
    protected ReactGateway createReactGateway() {
            ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                        return "index";
                    }
        };
            return new ReactGateway(this, isDebug(), host);
        }

            @Override
    public boolean isDebug() {
            return BuildConfig.DEBUG;
        }

            protected List<ReactPackage> getPackages() {
            // Add additional packages you require here
                    // No need to add RnnPackage and MainReactPackage
                            return Arrays.<ReactPackage>asList(
                                    new RNSoundPackage(),
                                    new RNAudioRecorderPlayerPackage(),
                                    new ReactSliderPackage(),
                                    new RNSpinkitPackage(),
                                    new RNFSPackage()
                        // eg. new VectorIconsPackage()
                            );
        }

            @Override
    public List<ReactPackage> createAdditionalReactPackages() {
            return getPackages();
        }
        }
