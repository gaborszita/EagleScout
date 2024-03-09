import {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SegmentedTeamSelector} from './SegmentedTeamSelector';
import {NoteFAB} from './NoteFAB';

export const NoteInputModal = ({
  onSubmit,
  isLoading,
  selectedAlliance,
  noteContents,
  setNoteContents,
}: {
  onSubmit: () => void;
  isLoading: boolean;
  selectedAlliance: string;
  noteContents: {
    [key: string]: string;
  };
  setNoteContents: (contents: {[key: string]: string}) => void;
}) => {
  const [localContent, setLocalContent] = useState<string>('');
  const [currentTeam, setCurrentTeam] = useState<number>(
    Number(Object.keys(noteContents)[0]) || 0,
  );
  const {colors} = useTheme();
  return (
    <Modal visible={true} animationType={'slide'}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.card}}>
        <SegmentedTeamSelector
          color={selectedAlliance}
          teams={Object.keys(noteContents).map(key => parseInt(key))}
          selectedTeam={currentTeam}
          setSelectedTeam={(team: number) => {
            setCurrentTeam(team);
            setLocalContent(noteContents[team]);
          }}
          completed={Object.keys(noteContents).map(
            key => noteContents[parseInt(key)].length > 0,
          )}
        />
        <KeyboardAvoidingView
          style={{flex: 1, height: '100%'}}
          behavior={'padding'}>
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              height: '100%',
              width: '100%',
            }}>
            <View
              style={{
                flex: 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
                padding: '5%',
                zIndex: 1,
              }}>
              <TextInput
                multiline={true}
                style={{flex: 1, color: colors.text, fontSize: 20}}
                onChangeText={text => {
                  setLocalContent(text);
                  setNoteContents({
                    ...noteContents,
                    [currentTeam]: text,
                  });
                }}
                value={localContent}
                placeholder={'Start writing...'}
                placeholderTextColor={'grey'}
              />
            </View>
            {/*<TouchableOpacity*/}
            {/*  onPress={() => {*/}
            {/*    setContent(localContent);*/}
            {/*    onSubmit();*/}
            {/*  }}*/}
            {/*  style={{*/}
            {/*    ...styles.button,*/}
            {/*    alignSelf: 'flex-end',*/}
            {/*    paddingtop: insets.top,*/}
            {/*    zIndex: 2,*/}
            {/*    right: '5%',*/}
            {/*  }}>*/}
            {/*  <Text style={{color: colors.background}}>Save</Text>*/}
            {/*</TouchableOpacity>*/}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <NoteFAB onSubmitPress={onSubmit} isLoading={isLoading} />
    </Modal>
  );
};
